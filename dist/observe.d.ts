type Options = {
    async: boolean;
    inherited: boolean;
};
type PropKey = string | symbol;
type Callback = (propName: PropKey, value: any) => unknown;
export declare function observe<T extends object>(object: T, propertyNames: (keyof T)[], callback: Callback, options?: Partial<Options>): void;
export declare function unobserve<T extends object>(object: T, props: Callback | (keyof T)[], callback?: Callback): void;
export {};
//# sourceMappingURL=observe.d.ts.map