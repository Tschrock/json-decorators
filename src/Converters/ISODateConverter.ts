import { JsonValue } from "../JsonTypes";
import { IJsonConverter } from "./IJsonConverter";
import { JsonConvertError } from "../JsonConvertError";

export class ISODateConverter implements IJsonConverter<Date> {

    public WriteJson(value: Date): JsonValue {
        return value.toISOString();
    }

    public ReadJson(value: JsonValue): Date {
        if (typeof value !== "string") throw new JsonConvertError("Expected a string");
        const date = new Date(value);
        if(Number.isNaN(date.valueOf())) throw new JsonConvertError(`Invalid date format: "${value}"`);
        return date;
    }

}
