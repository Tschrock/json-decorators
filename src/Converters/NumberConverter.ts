import { JsonValue } from "../JsonTypes";
import { IJsonConverter } from "./IJsonConverter";
import { JsonConvertError } from "../JsonConvertError";

export class NumberConverter implements IJsonConverter<number> {
    WriteJson(value: number): JsonValue {
        return value;
    }
    ReadJson(value: JsonValue): number {
        if(typeof value === "number") return value;
        else throw new JsonConvertError(`Expected a number`);
    }
}
