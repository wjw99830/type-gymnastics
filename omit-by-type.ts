import { PickByType } from './pick-by-type';
import { ValueOf } from './value-of';

/**
 * 目标：输入一个类型 T 和一个接口 I，输出一个没有 T 类型作为属性的新接口
 * @example
 * ```ts
 * interface Interface {
 *  a?: string;
 *  b: string;
 *  c: number;
 *  d: boolean;
 * }
 * type NoneString = OmitByType<Interface, string>; // { c: number; d: boolean }
 * ```
 */
export type OmitByType<I, T> = PickByType<I, Exclude<ValueOf<I>, T>>;

/** test */
interface Interface {
  a?: string;
  b: string;
  c: number;
  d: boolean;
}
export type NoneString = OmitByType<Interface, string>; // { c: number; d: boolean }
export type NoneNumber = OmitByType<Interface, number>; // { a?: string; b: string; d: boolean }
export type NoneBoolean = OmitByType<Interface, boolean>; // { a?: string; b: string; c: number }
