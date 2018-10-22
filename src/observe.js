import { getInheritedDescriptor } from 'lowclass/utils'

const propsAndCallbacks = new WeakMap

export
function observe(object, propertyNames, callback, options = {}) {
    // TODO the options.async option will make callbacks fire on the next microtask instead of synchronously
    options.async = options.async || false
    options.inherited = options.inherited || false

    for (const propName of propertyNames) {

        let propCallbacks = propsAndCallbacks.get(object)
        !propCallbacks && propsAndCallbacks.set(object, propCallbacks = new Map)

        let callbacks = propCallbacks.get(propName)

        if (callbacks) {
            if (!callbacks.includes(callback)) callbacks.push(callback)
            continue
        }

        // the rest only runs once, the first time the prop observation is set up

        propCallbacks.set(propName, callbacks = [])
        callbacks.push(callback)

        defineObservationGetterSetter(object, propName, options)
    }
}

export
function unobserve(object, props, callback) {
    const propCallbacks = propsAndCallbacks.get(object)

    if (!propCallbacks) {
        console.warn('the object is not observed, no need to unobserve:', object)
        return
    }

    // If called as unobserve(object, callback), unobserve all props for the callback.
    if (typeof props === 'function') {
        callback = props
        props = Array.from( propsAndCallbacks.get(object).keys() )
    }

    // Otherwise called as unobserve(object, props, callback), so unobserve the specific props for the callback.

    if (!callback) throw new TypeError('callback not supplied')

    for (const prop of props) {
        const callbacks = propCallbacks.get(prop)
        callbacks.includes(callback) &&
            callbacks.splice(callbacks.indexOf(callback), 1)
    }
}

function defineObservationGetterSetter(object, propName, options) {
    const descriptor = getInheritedDescriptor(object, propName) || {}
    const owner = options.inherited ? descriptor.owner || object : object

    let getValue
    let setValue

    if (descriptor.get || descriptor.set) {
        // we will use the existing getter/setter assuming they don't do
        // anyting crazy that we might not expect. (See? Another reason for
        // Object.observe)
        const oldGet = descriptor.get
        const oldSet = descriptor.set

        getValue = () => oldGet.call(object)
        setValue = value => oldSet.call(object, value)
    }
    else {
        let _value = descriptor.value

        delete descriptor.value
        delete descriptor.writable

        getValue = () => _value
        setValue = value => _value = value
    }

    Object.defineProperty(owner, propName, {
        ...descriptor,
        get: getValue,
        set(value) {
            setValue(value)
            runCallbacks(object, propName, getValue())
        },
    })
}

function runCallbacks(object, propName, value) {
    const callbacks = propsAndCallbacks.get(object).get(propName)
    for (const callback of callbacks) {
        callback(propName, value)
    }
}
