import 'reflect-metadata';

import { describe, it } from 'mocha';
import { expect } from 'chai';

import { JsonObject, JsonProperty, StringConverter, ObjectConverter, DeferredConverter } from '../src';
import { JsonPropertyData, MetadataKey } from '../src/Metadata';

@JsonObject()
class Test1 {

    @JsonProperty()
    public prop1?: string;

    @JsonProperty(String)
    public prop2?: unknown;

    @JsonProperty(StringConverter)
    public prop3?: unknown;

    @JsonProperty(new StringConverter())
    public prop4?: unknown;

    @JsonProperty("property5")
    public prop5?: string;

    @JsonProperty("property6", String)
    public prop6?: unknown;

    @JsonProperty("property7", StringConverter)
    public prop7?: unknown;

    @JsonProperty("property8", new StringConverter())
    public prop8?: unknown;

    @JsonProperty(() => String)
    public prop9?: unknown;

}

@JsonObject()
class Test2 {

    @JsonProperty()
    public prop1?: Test1;

    @JsonProperty(Test1)
    public prop2?: Test1;

    @JsonProperty("property3")
    public prop3?: Test1;

    @JsonProperty("property4", Test1)
    public prop4?: Test1;

}

function testConverter<T>(type: Function, propKey: keyof T & string, jsonKey: string, converterType: Function): void {
    const props: Map<string | symbol, JsonPropertyData> = Reflect.getMetadata(MetadataKey.JSON_PROPERTIES, type.prototype);
    const propVal = props.get(propKey);
    if(!propVal) throw new Error(`Property "${propKey}" has no JsonProperty() metadata`);

    // Json key should equal `propKey`
    expect(propVal.key).to.equal(jsonKey);

    // Converter should be of type `converterType`
    expect(propVal.converter.constructor).to.equal(converterType);
}

describe('@JsonProperty()', () => {

    it('should infer key from name and should infer converter from metadata', () => testConverter(Test1, "prop1", "prop1", StringConverter));
    it('should infer key from name and should infer converter from type', () => testConverter(Test1, "prop2", "prop2", StringConverter));
    it('should infer key from name and should use converter type', () => testConverter(Test1, "prop3", "prop3", StringConverter));
    it('should infer key from name and should use converter', () => testConverter(Test1, "prop4", "prop4", StringConverter));
    it('should use key and should infer converter from metadata', () => testConverter(Test1, "prop5", "property5", StringConverter));
    it('should use key and should infer converter from type', () => testConverter(Test1, "prop6", "property6", StringConverter));
    it('should use key and should use converter type', () => testConverter(Test1, "prop7", "property7", StringConverter));
    it('should use key and should use converter', () => testConverter(Test1, "prop8", "property8", StringConverter));
    it('should infer key from name and should get deferred converter from function', () => testConverter(Test1, "prop9", "prop9", DeferredConverter));

    it('should infer key from name and should infer object converter from metadata', () => testConverter(Test2, "prop1", "prop1", ObjectConverter));
    it('should infer key from name and should infer object converter from type', () => testConverter(Test2, "prop2", "prop2", ObjectConverter));
    it('should use key and should infer object converter from metadata', () => testConverter(Test2, "prop3", "property3", ObjectConverter));
    it('should use key and should infer object converter from type', () => testConverter(Test2, "prop4", "property4", ObjectConverter));

});
