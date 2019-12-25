import 'reflect-metadata';

import { describe, it } from 'mocha';
import { expect } from 'chai';

import { ObjectConverter, JsonObject, JsonProperty } from '../../src';

@JsonObject()
class Test1 {
    @JsonProperty()
    public prop1?: string;

    @JsonProperty()
    public prop2?: number;

    @JsonProperty()
    public prop3?: boolean;

    @JsonProperty()
    public prop4?: string;
}

const testObject = new Test1();
testObject.prop1 = "test";
testObject.prop2 = 4;
testObject.prop3 = false;

const testJsonObject = {
    prop1: "test",
    prop2: 4,
    prop3: false
}

const testObject2 = new Test1();
testObject2.prop1 = "test";
testObject2.prop3 = false;

const testJsonObject2 = {
    prop1: "test",
    prop2: "4",
    prop3: false
}

const converter = new ObjectConverter(Test1);

describe('ObjectConverter', () => {

    it('should read an object', () => {
        const warnings: Error[] = [];
        const result = converter.ReadJson(testJsonObject, warnings);
        expect(warnings).to.be.empty;
        expect(result).to.exist;
        if(result) expect(result.constructor).to.equal(Test1);
        expect(result).to.deep.equal(testObject);
    });

    it('should write an object', () => {
        const result = converter.WriteJson(testObject);
        expect(result).to.deep.equal(testJsonObject);
    });

    it('should throw an error when reading things that aren\'t an object', () => {
        expect(() => converter.ReadJson(1.035)).to.throw();
        expect(() => converter.ReadJson(true)).to.throw();
        expect(() => converter.ReadJson("asdf")).to.throw();
        expect(() => converter.ReadJson([0])).to.throw();
    });

    it('should generate warnings when reading members that aren\'t the right type', () => {
        const warnings: Error[] = [];

        const result = converter.ReadJson(testJsonObject2, warnings);

        expect(warnings).to.have.length(1);
        expect(result).to.exist;
        if(result) expect(result.constructor).to.equal(Test1);
        expect(result).to.deep.equal(testObject2);
    });

});
