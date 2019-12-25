import 'reflect-metadata';

import { describe, it } from 'mocha';
import { expect } from 'chai';

import { RecordConverter, NumberConverter } from '../../src';

const converter = new RecordConverter(NumberConverter);

const testRecord = {
    key1: 1,
    key2: 2,
    key3: 3,
    key4: 4,
    key5: 5
}

describe('RecordConverter', () => {

    it('should read a record', () => {
        const warnings: Error[] = [];
        const result = converter.ReadJson(testRecord, warnings);
        expect(warnings).to.be.empty;
        expect(result).to.deep.equal(testRecord);
    });

    it('should write a record', () => {
        const result = converter.WriteJson(testRecord);
        expect(result).to.deep.equal(testRecord);
    });

    it('should throw an error when reading things that aren\'t a record', () => {
        expect(() => converter.ReadJson(1.035)).to.throw();
        expect(() => converter.ReadJson(true)).to.throw();
        expect(() => converter.ReadJson("asdf")).to.throw();
        expect(() => converter.ReadJson([0])).to.throw();
    });

    it('should generate warnings when reading map members that aren\'t the right type', () => {
        const warnings: Error[] = [];

        const result = converter.ReadJson({
            badKey1: "1",
            ...testRecord,
            badKey2: true
        }, warnings);

        expect(warnings).to.have.length(2);
        expect(result).to.deep.equal(testRecord);
    });

});
