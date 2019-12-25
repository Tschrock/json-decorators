import { JsonValue, JsonMap, ConvertableType } from "../JsonTypes";
import { JsonConvertError } from "../JsonConvertError";
import { IJsonConverter } from "./IJsonConverter";
import { getMetadata, MetadataKey, getJsonPropertyMetadata } from "../Metadata";
import { isRequired } from "../ConvertUtil";

/**
 * A JSON converter for a decorated class.
 */
export class ObjectConverter<T> implements IJsonConverter<T> {

    constructor(private readonly type: ConvertableType<T>) { }


    public WriteJson(value: T): JsonValue {

        const target = Object.getPrototypeOf(value);

        // Make sure the value is a serializable object
        const isSerializable = getMetadata(MetadataKey.JSON_OBJECT, target);
        if (!isSerializable) throw new JsonConvertError("The given value is not marked as serializable.");

        // Make sure the value we were given is an instance of our type
        const isInstance = value instanceof this.type;
        if (!isInstance) throw new JsonConvertError("The given value is not an instance of this converter's type.");

        // Get all the serializable properties for the given value
        const jsonProps = getJsonPropertyMetadata(target);

        // Make an empty object to store our results
        const result: JsonMap = Object.create(null);

        // Loop though all defined json properties
        for (const [propertyKey, jsonData] of jsonProps) {

            // Get the value of the property
            const originalValue: unknown = (value as Record<string | symbol, unknown>)[propertyKey as string];

            if(typeof originalValue !== 'undefined') {

                // Convert the a json value
                const jsonValue = jsonData.converter.WriteJson(originalValue);

                // Record the results
                result[jsonData.key] = jsonValue;

            }

        }

        return result;

    }

    public ReadJson(value: JsonValue, warnings: Error[] = []): T | null {

        // Check null
        if(typeof value === 'undefined' || value === null) return null;

        // Make sure the value is an object
        if(typeof value !== 'object' || Array.isArray(value)) throw new JsonConvertError("Expected an object");

        // Create a new instance of our type
        const newinstance = new this.type();

        // Get all the serializable properties for the type
        const jsonProps = getJsonPropertyMetadata(this.type.prototype);

        // Loop though all defined json properties
        for (const [propertyKey, jsonData] of jsonProps) {

            // Check if it's required
            const required = isRequired(this.type, propertyKey);

            // Get the value of the property
            const jsonValue = value[jsonData.key];

            // Check if the property is missing
            if(required && (typeof jsonValue === 'undefined' || jsonValue === null)) throw new JsonConvertError(`Json Property '${jsonData.key}' is required.`);
            if(typeof jsonValue === 'undefined') continue;

            try {

                // Convert the json value
                const newValue = jsonData.converter.ReadJson(jsonValue, warnings);

                // Check if the result is missing
                if(required && (typeof newValue === 'undefined' || newValue === null)) throw new JsonConvertError(`Json Property '${jsonData.key}' is required.`);
                if(typeof jsonValue === 'undefined') continue;

                // Record the results
                (newinstance as Record<string, unknown>)[propertyKey as string] = newValue;

            }
            catch(e) {
                if(required) throw e;
                else warnings.push(e);
            }

        }

        // return the created instance
        return newinstance;
    }


}

