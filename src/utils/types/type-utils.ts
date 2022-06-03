export type AllOrNone<T> = Required<T> | Partial<Record<keyof T, undefined>>;
export type ArrayElementType<T> = T extends (infer E)[] ? E : T;
