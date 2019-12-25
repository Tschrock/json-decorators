import { defineMetadata, MetadataKey } from "./Metadata";
import { JsonConvertError } from "./JsonConvertError";

/**
 * Marks a json property as required (deserialization will fail if it isn't present)
 *
 * Some notes:
 *  - On a static property, `target` will be the constructor function
 *  - On an instance property, `target` will be the prototype of the instance
 *
 * @param target The target object
 * @param propertyKey The property key
 */
export function JsonRequired(target: object, propertyKey: string | symbol): void  {

    // Json decoding doesn't make sense for a static property
    if(typeof target === 'function') throw new JsonConvertError("Cannot use `@JsonProperty(...)` on a static property.");

    // Add the metadata flag to the property
    defineMetadata(MetadataKey.JSON_REQUIRED, true, target, propertyKey);

}
