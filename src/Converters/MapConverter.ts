import { JsonValue, ConverterParam } from "../JsonTypes";
import { IJsonConverter } from "./IJsonConverter";
import { JsonConvertError } from "../JsonConvertError";
import { getConverterFrom } from "../ConvertUtil";

export class MapConverter<T> implements IJsonConverter<Map<string, T> | null> {
    private readonly converter: IJsonConverter<T>;
    constructor(converter: ConverterParam<T>) {
        const realConverter = getConverterFrom(converter);
        if (realConverter == null) throw new Error('Invalid Converter');
        this.converter = realConverter as IJsonConverter<T>;
    }

    public WriteJson(value: Map<string, T> | null): JsonValue {

        // Check null
        if(typeof value === 'undefined' || value === null) return null;

        // Create a new null object to hold the values
        const result = Object.create(null);

        // For each key-value pair
        for (const [itemKey, itemValue] of value) {

            // Write the value to the object
            result[itemKey] = this.converter.WriteJson(itemValue);

        }

        // Return the result object
        return result;
    }

    public ReadJson(value: JsonValue, warnings: Error[] = []): Map<string, T> | null {

        // Check null
        if(typeof value === 'undefined' || value === null) return null;

        // Make sure the value is an object
        if(typeof value !== 'object' || Array.isArray(value)) throw new JsonConvertError("Expected an object");

        // Get the properties of the object
        const props = Object.getOwnPropertyNames(value);

        // Create a new map to hold the results
        const result = new Map<string, T>();

        // For each property
        for (const prop of props) {
            const propValue = value[prop];

            try {
                // Convert the json value
                const newValue = this.converter.ReadJson(propValue, warnings);

                // If it's not null, add it
                if(typeof newValue !== 'undefined' && newValue !== null) result.set(prop, newValue);
            }
            catch(e) {
                warnings.push(e);
            }

        }
        return result;
    }

}
