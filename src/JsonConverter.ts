import 'reflect-metadata';
import { parse, ParseOptions, ParseError } from 'jsonc-parser';

import { ConverterParam, JsonValue } from './JsonTypes';
import { getConverterFrom } from './ConvertUtil';

/**
 * Provides methods for converting between Typescript types and JSON types.
 */
export class JsonConverter {

    /**
     * Serializes the specified object to a JSON string.
     * @param value The object to serialize.
     */
    static SerializeObject<T extends object>(value: T, type: ConverterParam<T>): string {
        const converter = getConverterFrom(type);
        if (converter == null) throw new Error('Invalid Converter');
        return JSON.stringify(converter.WriteJson(value));
    }

    /**
     * Deserializes the JSON to the specified type.
     * @param value The JSON to deserialize.
     */
    static DeserializeObject<T extends object>(value: string, type: ConverterParam<T>, options?: ParseOptions): T | undefined {

        const converter = getConverterFrom(type);
        if (converter == null) throw new Error('Invalid Converter');

        const errors: ParseError[] = [];
        const jsonValue: JsonValue = parse(value, errors, options);

        if(errors.length > 0) throw errors[0].error;

        return converter.ReadJson(jsonValue) as T;
    }

}
