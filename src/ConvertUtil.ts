import { IJsonConverter, StringConverter, BooleanConverter, NumberConverter, ISODateConverter, ObjectConverter } from "./Converters";
import { getMetadata, MetadataKey } from "./Metadata";
import { ConvertableType, ConverterParam } from "./JsonTypes";
import { DeferredConverter } from "./Converters/DeferredConverter";

export function isIJsonConverter(value: unknown): value is IJsonConverter<unknown> {
    if (typeof value === 'object' && value != null) {
        const value2: Partial<IJsonConverter<unknown>> = value;
        return 'WriteJson' in value2 && typeof value2.WriteJson === 'function'
            && 'ReadJson' in value2 && typeof value2.WriteJson === 'function';
    }
    return false;
}

export function isIJsonConverterType(value: unknown): value is new () => IJsonConverter<unknown> {
    return typeof value === 'function' && value.prototype !== null && typeof value.prototype !== 'undefined' && isIJsonConverter(value.prototype);
}

export function isSerializableType(value: unknown): value is ConvertableType<unknown> {
    return typeof value === 'function' && value.prototype !== null && typeof value.prototype !== 'undefined' && getMetadata(MetadataKey.JSON_OBJECT, value.prototype) === true;
}

export function isRequired(type: ConvertableType, property: string | symbol): boolean | undefined {
    return getMetadata(MetadataKey.JSON_REQUIRED, type.prototype, property);
}

export function getConverterFrom(value: unknown): IJsonConverter<unknown> | null {

    // Check if it's a converter instance
    if (isIJsonConverter(value)) return value;

    // Check if it's a converter type
    if (isIJsonConverterType(value)) return new value();

    // Check if it's a standard JS type
    switch (value) {
        case String: return new StringConverter();
        case Boolean: return new BooleanConverter();
        case Number: return new NumberConverter();
        case Date: return new ISODateConverter();
    }

    // Check if it's a type that is serializable
    if (isSerializableType(value)) return new ObjectConverter(value);

    // Check if it might be a function that returns a converter
    // This helps resolve recursive class converters
    if(
        typeof value === 'function'
        && typeof value.prototype === 'undefined'
        && Object.getPrototypeOf(value) === Function.prototype
        && value.length === 0
    ) {
        try {
            return new DeferredConverter(value as () => ConverterParam);
        }
        catch(_) { /** Ignore Error */ }
    }

    return null;
}
