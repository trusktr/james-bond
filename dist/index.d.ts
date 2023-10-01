import { observe, unobserve } from './observe.js';
export { observe, unobserve };
declare type Handler = (arg: {
    paths: string[];
}, ...args: any[]) => unknown;
export declare function deeplyObserve(object: object, handler: Handler, argumentArray?: any[], path?: string): void;
export declare const version = "0.5.1";
//# sourceMappingURL=index.d.ts.map