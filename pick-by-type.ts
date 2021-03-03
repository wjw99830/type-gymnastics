import { ValueOf } from './value-of';

/**
 * 目标：输入一个类型 T 和一个接口 I，输出一个只有 T 类型作为属性的新接口
 * @example
 * ```ts
 * interface Interface {
 *  a?: string;
 *  b: string;
 *  c: number;
 *  d: boolean;
 * }
 * type OnlyString = PickByType<Interface, string>; // { b: string }
 * ```
 */
export type PickByType<I, T> = Pick<I, AssertKeys<I, ExtractTargetKeys<I, T>>>;

type ValueToMap<I> = {
  [K in keyof I]: Map<K, I[K]>;
};
type ExtractTargetMaps<I, T> = Extract<ValueOf<ValueToMap<I>>, Map<unknown, T>>;
type ExtractTargetKeys<I, T> = ExtractTargetMaps<I, T> extends Map<
  infer K,
  unknown
>
  ? K
  : never;
/** ts推导不出来，需要断言一下 */
type AssertKeys<I, K> = K extends keyof I ? K : never;

/** test */
interface Interface {
  a?: string;
  b: string;
  c: number;
  d: boolean;
}
export type OnlyString = PickByType<Interface, string>; // { b: string }
export type OnlyNumber = PickByType<Interface, number>; // { c: number }
export type OnlyBoolean = PickByType<Interface, boolean>; // { d: boolean }
