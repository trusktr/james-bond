import { observe, unobserve } from './observe.js';
export { observe, unobserve };
export function deeplyObserve(object, handler, argumentArray = [], path = '') {
    if (typeof object !== 'object' || !object) {
        throw new Error('Cannot observe a non-object.');
    }
    ;
    Object.observe(object, function (changes) {
        var paths = [];
        changes.forEach(function (change) {
            paths.push(path.length ? path + '.' + change.name : change.name);
        });
        handler({ paths }, ...argumentArray);
    });
    for (var prop in object) {
        const value = object[prop];
        if (value && typeof value === 'object') {
            deeplyObserve(value, handler, argumentArray, path.length ? path + '.' + prop : prop);
        }
    }
}
export const version = '0.5.0';
//# sourceMappingURL=index.js.map