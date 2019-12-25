import { ConverterParam } from "./JsonTypes";
import { defineMetadata, MetadataKey, getOwnMetadata, JsonPropertyData, getMetadata } from "./Metadata";
import { IJsonConverter } from "./Converters";
import { JsonConvertError } from "./JsonConvertError";
import { getConverterFrom } from "./ConvertUtil";

/**
 * Declares metadata about a JSON property.
 */
export function JsonProperty(): PropertyDecorator

/**
 * Declares metadata about a JSON property.
 * @param key The JSON key.
 */
export function JsonProperty(key: string): PropertyDecorator

/**
 * Declares metadata about a JSON property.
 * @param converter The converter or serializable class to populate.
 */
export function JsonProperty(converter: ConverterParam): PropertyDecorator

/**
 * Declares metadata about a JSON property.
 * @param key The JSON key.
 * @param converter The converter or serializable class to populate.
 */
export function JsonProperty(key: string, converter: ConverterParam): PropertyDecorator

/**
 * Declares metadata about a JSON property.
 *
 * Some notes:
 *  - On a static property, `target` will be the constructor function
 *  - On an instance property, `target` will be the prototype of the instance
 *
 * @param keyOrConverterOrNone
 * @param converterOrNone
 */
export function JsonProperty(keyOrConverterOrNone?: string | ConverterParam, converterOrNone?: ConverterParam): PropertyDecorator {
    return (target: object, propertyKey: string | symbol): void => {

        // Json decoding doesn't make sense for a static property
        if (typeof target === 'function') throw new JsonConvertError("Cannot use `@JsonProperty(...)` on a static property.")

        // Deal with the function overloads
        if (typeof keyOrConverterOrNone !== 'string') [keyOrConverterOrNone, converterOrNone] = [propertyKey.toString(), keyOrConverterOrNone]

        // Get the key
        const key: string = keyOrConverterOrNone;

        // If we weren't given a converter type, use the design type
        if(converterOrNone == null) converterOrNone = getMetadata(MetadataKey.DESIGN_TYPE, target, propertyKey);

        // Get the converter
        const converter: IJsonConverter<unknown> | null = getConverterFrom(converterOrNone);
        if (converter === null) throw new Error(`Could not determine the converter for ${target.constructor.name}.${key}`);

        // Get the property metadata for the target class
        let jsonProps = getOwnMetadata(MetadataKey.JSON_PROPERTIES, target);

        // If we don't have an existing map of metadata, create one
        if (!jsonProps) {
            jsonProps = new Map<string | symbol, JsonPropertyData>();
            defineMetadata(MetadataKey.JSON_PROPERTIES, jsonProps, target);
        }

        // Add the declared json key/converter to the class metadata
        jsonProps.set(propertyKey, { key, converter });
    }
}
