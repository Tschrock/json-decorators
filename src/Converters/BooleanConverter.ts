import { JsonValue } from "../JsonTypes";
import { IJsonConverter } from "./IJsonConverter";
import { JsonConvertError } from "../JsonConvertError";

export class BooleanConverter implements IJsonConverter<boolean> {
    WriteJson(value: boolean): JsonValue {
        return value;
    }
    ReadJson(value: JsonValue): boolean {
        if(typeof value === "boolean") return value;
        else throw new JsonConvertError(`Expected a boolean`);
    }
}
