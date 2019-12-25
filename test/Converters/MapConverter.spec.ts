import 'reflect-metadata';

import { describe, it } from 'mocha';
import { expect } from 'chai';

import { MapConverter, NumberConverter } from '../../src';

const converter = new MapConverter(NumberConverter);

const testJsonMap = {
    key1: 1,
    key2: 2,
    key3: 3,
    key4: 4,
    key5: 5
}

const testMap = new Map<string, number>([
    ["key1", 1],
    ["key2", 2],
    ["key3", 3],
    ["key4", 4],
    ["key5", 5]
])

describe('MapConverter', () => {

    it('should read a map', () => {
        const warnings: Error[] = [];
        const result = converter.ReadJson(testJsonMap, warnings);
        expect(warnings).to.be.empty;
        expect(result).to.deep.equal(testMap);
    });

    it('should write a map', () => {
        const result = converter.WriteJson(testMap);
        expect(result).to.deep.equal(testJsonMap);
    });

    it('should throw an error when reading things that aren\'t a map', () => {
        expect(() => converter.ReadJson(1.035)).to.throw();
        expect(() => converter.ReadJson(true)).to.throw();
        expect(() => converter.ReadJson("asdf")).to.throw();
        expect(() => converter.ReadJson([0])).to.throw();
    });

    it('should generate warnings when reading map members that aren\'t the right type', () => {
        const warnings: Error[] = [];

        const result = converter.ReadJson({
            badKey1: "1",
            ...testJsonMap,
            badKey2: true
        }, warnings);

        expect(warnings).to.have.length(2);
        expect(result).to.deep.equal(testMap);
    });

});
