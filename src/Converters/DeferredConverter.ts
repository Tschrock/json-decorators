import { JsonValue, ConverterParam } from "../JsonTypes";
import { IJsonConverter } from "./IJsonConverter";
import { getConverterFrom } from "../ConvertUtil";

export class DeferredConverter<T> implements IJsonConverter<T | null> {
    private readonly converterClosure: () => ConverterParam<T>;
    private converter: IJsonConverter<T> | null = null;
    constructor(converterClosure: () => ConverterParam<T>) {
        this.converterClosure = converterClosure;
    }

    public WriteJson(value: T | null): JsonValue {
        if(!this.converter) {
            this.converter = getConverterFrom(this.converterClosure()) as IJsonConverter<T> | null;
            if (!this.converter) throw new Error('Invalid Converter');
        }
        return this.converter.WriteJson(value);
    }

    public ReadJson(value: JsonValue, warnings: Error[] = []): T | null {

        if(!this.converter) {
            this.converter = getConverterFrom(this.converterClosure()) as IJsonConverter<T> | null;
            if (!this.converter) throw new Error('Invalid Converter');
        }
        return this.converter.ReadJson(value, warnings);
    }

}
