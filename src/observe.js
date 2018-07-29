
const propsAndCallbacks = new WeakMap

export default
function observe(object, propertyNames, callback) {
    let propValues

    for (const propName of propertyNames) {
        const descriptor = Object.getOwnPropertyDescriptor(object, propName) || {}

        let propCallbacks = propsAndCallbacks.get(object)
        !propCallbacks && propsAndCallbacks.set(object, propCallbacks = new Map)

        let callbacks = propCallbacks.get(propName)

        if (callbacks) {
            if (!callbacks.includes(callback)) callbacks.push(callback)
            continue
        }

        // the rest only runs the first time the prop observation is set up

        propCallbacks.set(propName, callbacks = [])
        callbacks.push(callback)

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
            if (!propValues) propValues = new Map

            const initialValue = descriptor.value
            propValues.set(propName, initialValue)

            delete descriptor.value
            delete descriptor.writable

            getValue = () => propValues.get(propName)
            setValue = value => propValues.set(propName, value)
        }

        Object.defineProperty(object, propName, {
            ...descriptor,

            get() {
                return getValue()
            },

            set(value) {
                setValue(value)
                runCallbacks(object, propName, getValue())
            },
        })
    }
}

// TODO unobserve

function runCallbacks(object, propName, value) {
    const callbacks = propsAndCallbacks.get(object).get(propName)
    for (const callback of callbacks) {
        callback(propName, value)
    }
}
