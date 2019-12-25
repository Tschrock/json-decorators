import { JsonValue } from "../JsonTypes";

export interface IJsonConverter<T> {
    WriteJson(value: T | null): JsonValue;
    ReadJson(value: JsonValue, warnings?: Error[]): T | null;
}
