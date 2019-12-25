import { JsonValue } from "../JsonTypes";
import { IJsonConverter } from "./IJsonConverter";
import { JsonConvertError } from "../JsonConvertError";

export class IntegerConverter implements IJsonConverter<number> {
    WriteJson(value: number): JsonValue {
        return value;
    }
    ReadJson(value: JsonValue): number {
        if(typeof value === "number" && !Number.isNaN(value) && Number.isFinite(value) && Number.isInteger(value)) {
            return value;
        }
        throw new JsonConvertError(`Expected an integer`);
    }
}
