import { JsonValue, ConverterParam } from "../JsonTypes";
import { IJsonConverter } from "./IJsonConverter";
import { JsonConvertError } from "../JsonConvertError";
import { getConverterFrom } from "../ConvertUtil";

export class RecordConverter<T> implements IJsonConverter<Record<string, T> | null> {
    private readonly converter: IJsonConverter<T>;
    constructor(converter: ConverterParam<T>) {
        const realConverter = getConverterFrom(converter);
        if (realConverter == null) throw new Error('Invalid Converter');
        this.converter = realConverter as IJsonConverter<T>;
     }

    public WriteJson(value: Record<string, T> | null): JsonValue {

        // Check null
        if(typeof value === 'undefined' || value === null) return null;

        // Create a new null object to hold the values
        const result = Object.create(null);

        // For each value property
        const props = Object.getOwnPropertyNames(value);
        for(const prop of props) {

            // Write the value to the object
            result[prop] = this.converter.WriteJson(value[prop]);

        }

        // Return the result object
        return result;
    }

    public ReadJson(value: JsonValue, warnings: Error[] = []): Record<string, T> | null {

        // Check null
        if(typeof value === 'undefined' || value === null) return null;

        // Make sure the value is an object
        if(typeof value !== 'object' || Array.isArray(value)) throw new JsonConvertError("Expected an object");

        // Get the properties of the object
        const props = Object.getOwnPropertyNames(value);

        // Create a new null object to hold the results
        const result = Object.create(null);

        // For each property
        for (const prop of props) {
            const propValue = value[prop];

            try {
                // Convert the json value
                const newValue = this.converter.ReadJson(propValue, warnings);

                // If it's not null, add it
                if(typeof newValue !== 'undefined' && newValue !== null) result[prop] = newValue;
            }
            catch(e) {
                warnings.push(e);
            }

        }
        return result;
    }

}
