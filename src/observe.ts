import {getInheritedDescriptor} from 'lowclass'

type Options = {
	async: boolean
	inherited: boolean
}

type PropKey = string | symbol // Make our own PropKey because TypeScript's PropertyKey is incorrect.

type Callback = (propName: PropKey, value: any) => unknown

const propsAndCallbacks = new WeakMap<object, Map<PropKey, Callback[]>>()

export function observe<T extends object>(
	object: T,
	propertyNames: (keyof T)[],
	callback: Callback,
	options: Partial<Options> = {},
) {
	// TODO the options.async option will make callbacks fire on the next microtask instead of synchronously
	options.async = options.async || false
	options.inherited = options.inherited || false

	for (const propName of propertyNames) {
		let propCallbacks = propsAndCallbacks.get(object)
		!propCallbacks && propsAndCallbacks.set(object, (propCallbacks = new Map()))

		let callbacks = propCallbacks.get(propName as PropKey)

		if (!callbacks) {
			propCallbacks.set(propName as PropKey, (callbacks = []))
			defineObservationGetterSetter(object, propName, options as Options)
		}

		if (!callbacks.includes(callback)) callbacks.push(callback)
	}
}

// NOTE, unobserve does not remove the observation accessors that observe
// creates. It might be nice if it did, so that objects can return to their lean
// shape. TODO can we do it?
export function unobserve<T extends object>(object: T, props: Callback | (keyof T)[], callback?: Callback) {
	const propCallbacks = propsAndCallbacks.get(object)

	if (!propCallbacks) {
		console.warn('the object is not observed, no need to unobserve:', object)
		return
	}

	// If called as unobserve(object, callback), unobserve all props for the callback.
	if (typeof props === 'function') {
		callback = props
		props = Array.from(propCallbacks.keys()) as (keyof T)[]
	}

	// Otherwise called as unobserve(object, props, callback), so unobserve the specific props for the callback.

	if (!callback) throw new TypeError('callback not supplied')

	for (const prop of props) {
		const callbacks = propCallbacks.get(prop as PropKey)!

		if (callbacks.includes(callback)) {
			callbacks.splice(callbacks.indexOf(callback), 1)
			if (!callbacks.length) propCallbacks.delete(prop as PropKey)
		}
	}
}

// This is used to keep track if an object already has an observation accessor
// in place for a given property. If so, then we don't need to add another layer
// of property descriptor on top for each new call to observe on the object.
const objectsToObservableProps = new WeakMap<object, Set<PropKey>>()

function defineObservationGetterSetter<T extends object>(object: T, propName: keyof T, options: Options) {
	let observableProps: Set<PropKey> | undefined
	const inherited = options.inherited

	if (!inherited) {
		observableProps = objectsToObservableProps.get(object) as Set<PropKey> | undefined
		if (!observableProps) objectsToObservableProps.set(object, (observableProps = new Set()))
		else if (observableProps.has(propName as PropKey)) return
	}

	// get the existing descriptor, or create a new one if the property doesn't exist.
	const descriptor =
		getInheritedDescriptor(object, propName) ||
		({
			value: undefined,
			writable: true,
			configurable: true,
			enumerable: true,
		} as ReturnType<typeof getInheritedDescriptor>)!

	const owner = options.inherited ? descriptor.owner || object : object

	if (inherited) {
		// TODO, this check probably actually needs to look up on the prototype
		// chain, because people can modify prototype chains and introduce new
		// descriptors anywhere in the chain. We want to check the whole chain
		// to see if we find an observation accessor defined by us.
		observableProps = objectsToObservableProps.get(owner) as Set<PropKey> | undefined
		if (!observableProps) objectsToObservableProps.set(owner, (observableProps = new Set()))
		else if (observableProps.has(propName as PropKey)) return
	}

	let getValue: (() => any) | undefined
	let setValue: ((v: any) => void) | undefined

	if (descriptor.get || descriptor.set) {
		// we will use the existing getter/setter assuming they don't do
		// anyting crazy that we might not expect. (See? Another reason for
		// Object.observe)
		const oldGet = descriptor.get
		const oldSet = descriptor.set

		getValue = oldGet ? () => oldGet.call(object) : undefined
		setValue = oldSet ? value => oldSet.call(object, value) : undefined
	} else {
		let _value = descriptor.value

		if (!descriptor.writable) {
			console.error(
				`Can not observe readonly property "${String(propName)}" with descriptor`,
				descriptor,
				`of object:`,
				object,
			)

			throw new Error(`Can not observe readonly property "${String(propName)}" of object: ${object} (see above)`)
		}

		delete descriptor.value
		delete descriptor.writable

		getValue = () => _value
		setValue = value => (_value = value)
	}

	if (!setValue) throw new Error('Can not observe read-only property.')
	if (!getValue) throw new Error('Can not observe write-only property.')

	Object.defineProperty(owner, propName, {
		...descriptor,
		get: getValue,
		set(value) {
			setValue!(value)
			runCallbacks(object, propName, getValue!())
		},
	})

	observableProps!.add(propName as PropKey)
}

function runCallbacks<T extends object>(object: T, propName: keyof T, value: any) {
	const callbacks = propsAndCallbacks.get(object)!.get(propName as PropKey)

	if (!callbacks) return

	for (const callback of callbacks) {
		callback(propName as PropKey, value)
	}
}
