import 'reflect-metadata';

import { describe, it } from 'mocha';
import { expect } from 'chai';

import { ArrayConverter, NumberConverter } from '../../src';

const converter = new ArrayConverter(NumberConverter);

describe('ArrayConverter', () => {

    it('should read an array', () => {
        const warnings: Error[] = [];
        const result = converter.ReadJson([0, 1, 2, 3], warnings);
        expect(warnings).to.be.empty;
        expect(result).to.deep.equal([0, 1, 2, 3]);
    });

    it('should write an array', () => {
        const result = converter.WriteJson([0, 1, 2, 3]);
        expect(result).to.deep.equal([0, 1, 2, 3]);
    });

    it('should throw an error when reading things that aren\'t arrays', () => {
        expect(() => converter.ReadJson(1)).to.throw();
        expect(() => converter.ReadJson("asdf")).to.throw();
        expect(() => converter.ReadJson(true)).to.throw();
        expect(() => converter.ReadJson({ a: 1 })).to.throw();
    });

    it('should generate warnings when reading array members that aren\'t the right type', () => {
        const warnings: Error[] = [];
        const result = converter.ReadJson([0, "1", true, 10, { a: 1 }, [0], 20], warnings);

        expect(warnings).to.have.length(4);
        expect(result).to.deep.equal([0, 10, 20]);

    });

});
