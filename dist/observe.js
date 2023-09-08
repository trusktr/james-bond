import { getInheritedDescriptor } from 'lowclass';
const propsAndCallbacks = new WeakMap();
export function observe(object, propertyNames, callback, options = {}) {
    options.async = options.async || false;
    options.inherited = options.inherited || false;
    for (const propName of propertyNames) {
        let propCallbacks = propsAndCallbacks.get(object);
        !propCallbacks && propsAndCallbacks.set(object, (propCallbacks = new Map()));
        let callbacks = propCallbacks.get(propName);
        if (callbacks) {
            if (!callbacks.includes(callback))
                callbacks.push(callback);
            continue;
        }
        propCallbacks.set(propName, (callbacks = []));
        callbacks.push(callback);
        defineObservationGetterSetter(object, propName, options);
    }
}
export function unobserve(object, props, callback) {
    const propCallbacks = propsAndCallbacks.get(object);
    if (!propCallbacks) {
        console.warn('the object is not observed, no need to unobserve:', object);
        return;
    }
    if (typeof props === 'function') {
        callback = props;
        props = Array.from(propCallbacks.keys());
    }
    if (!callback)
        throw new TypeError('callback not supplied');
    for (const prop of props) {
        const callbacks = propCallbacks.get(prop);
        if (callbacks.includes(callback)) {
            callbacks.splice(callbacks.indexOf(callback), 1);
            if (!callbacks.length)
                propCallbacks.delete(prop);
        }
    }
}
const objectsToObservableProps = new WeakMap();
function defineObservationGetterSetter(object, propName, options) {
    let observableProps;
    const inherited = options.inherited;
    if (!inherited) {
        observableProps = objectsToObservableProps.get(object);
        if (!observableProps)
            objectsToObservableProps.set(object, (observableProps = new Set()));
        else if (observableProps.has(propName))
            return;
    }
    const descriptor = getInheritedDescriptor(object, propName) ||
        {
            value: undefined,
            writable: true,
            configurable: true,
            enumerable: true,
        };
    const owner = options.inherited ? descriptor.owner || object : object;
    if (inherited) {
        observableProps = objectsToObservableProps.get(owner);
        if (!observableProps)
            objectsToObservableProps.set(owner, (observableProps = new Set()));
        else if (observableProps.has(propName))
            return;
    }
    let getValue;
    let setValue;
    if (descriptor.get || descriptor.set) {
        const oldGet = descriptor.get;
        const oldSet = descriptor.set;
        getValue = oldGet ? () => oldGet.call(object) : undefined;
        setValue = oldSet ? value => oldSet.call(object, value) : undefined;
    }
    else {
        let _value = descriptor.value;
        if (!descriptor.writable) {
            console.error(`Can not observe readonly property "${propName}" with descriptor`, descriptor, `of object:`, object);
            throw new Error(`Can not observe readonly property "${propName}" of object: ${object} (see above)`);
        }
        delete descriptor.value;
        delete descriptor.writable;
        getValue = () => _value;
        setValue = value => (_value = value);
    }
    if (!setValue)
        throw new Error('Can not observe read-only property.');
    if (!getValue)
        throw new Error('Can not observe write-only property.');
    Object.defineProperty(owner, propName, {
        ...descriptor,
        get: getValue,
        set(value) {
            setValue(value);
            runCallbacks(object, propName, getValue());
        },
    });
    observableProps.add(propName);
}
function runCallbacks(object, propName, value) {
    const callbacks = propsAndCallbacks.get(object).get(propName);
    if (!callbacks)
        return;
    for (const callback of callbacks) {
        callback(propName, value);
    }
}
//# sourceMappingURL=observe.js.map