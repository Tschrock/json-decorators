import { IJsonConverter } from "./IJsonConverter";
import { JsonValue } from "../JsonTypes";


export class JsonValueConverter implements IJsonConverter<JsonValue>  {
    WriteJson(value: JsonValue): JsonValue {
        return value;
    }
    ReadJson(value: JsonValue): JsonValue {
        return value;
    }
}
