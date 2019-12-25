import { IJsonConverter } from "./Converters";

export type JsonPrimative = boolean | number | string | null;
export interface JsonMap { [key: string]: JsonValue }
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface JsonArray extends Array<JsonValue> { }
export type JsonValue = JsonPrimative | JsonArray | JsonMap;

export type ConvertableType<T = unknown> = new () => T;

export type ConvertableBuiltin = typeof String | typeof Boolean | typeof Number | typeof Date;
export type ConvertableGenerator<T> = () => ConverterParam<T>;
export type SimpleConverterType<T> = new () => IJsonConverter<T>;

export type ConverterParam<T = unknown> =
    IJsonConverter<T>
    | SimpleConverterType<T>
    | ConvertableBuiltin
    | ConvertableType<T>
    | ConvertableGenerator<T>;
