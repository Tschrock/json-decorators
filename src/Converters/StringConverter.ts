import { JsonValue } from "../JsonTypes";
import { IJsonConverter } from "./IJsonConverter";
import { JsonConvertError } from "../JsonConvertError";

export class StringConverter implements IJsonConverter<string> {
    WriteJson(value: string): JsonValue {
        return value;
    }
    ReadJson(value: JsonValue): string {
        if(typeof value === "string") return value;
        else throw new JsonConvertError(`Expected a string`);
    }
}
