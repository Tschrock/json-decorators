import { JsonValue, ConverterParam } from "../JsonTypes";
import { IJsonConverter } from "./IJsonConverter";
import { JsonConvertError } from "../JsonConvertError";
import { getConverterFrom } from "../ConvertUtil";

export class ArrayConverter<T> implements IJsonConverter<Array<T> | null> {
    private readonly converter: IJsonConverter<T>;
    constructor(converter: ConverterParam<T>) {
        const realConverter = getConverterFrom(converter);
        if (realConverter == null) throw new Error('Invalid Converter');
        this.converter = realConverter as IJsonConverter<T>;
    }

    public WriteJson(value: Array<T> | null): JsonValue {

        // Check null
        if(typeof value === 'undefined' || value === null) return null;

        // Map the values
        return value.map(v => this.converter.WriteJson(v));
    }

    public ReadJson(values: JsonValue, warnings: Error[] = []): Array<T> | null {

        // Check null
        if(typeof values === 'undefined' || values === null) return null;

        // Make sure the value is an array
        if (!Array.isArray(values)) throw new JsonConvertError("Expected an array");

        // Create a new array to hold the results
        const result: Array<T> = [];

        // For each value
        for (const value of values) {
            try {

                // Convert the json value
                const newValue = this.converter.ReadJson(value, warnings);

                // If it's not null, add it
                if(typeof newValue !== 'undefined' && newValue !== null) result.push(newValue);

            }
            catch(e) {
                warnings.push(e);
            }
        }

        return result;
    }

}
