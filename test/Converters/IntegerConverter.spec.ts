import 'reflect-metadata';

import { describe, it } from 'mocha';
import { expect } from 'chai';

import { IntegerConverter } from '../../src';

const converter = new IntegerConverter();

describe('IntegerConverter', () => {

    it('should read an integer', () => {
        const result = converter.ReadJson(1);
        expect(result).to.equal(1);
    });

    it('should write an integer', () => {
        const result = converter.WriteJson(1);
        expect(result).to.equal(1);
    });

    it('should throw an error when reading things that aren\'t an integer', () => {

        expect(() => converter.ReadJson(1.035)).to.throw();
        expect(() => converter.ReadJson(true)).to.throw();
        expect(() => converter.ReadJson("asdf")).to.throw();
        expect(() => converter.ReadJson([0])).to.throw();
        expect(() => converter.ReadJson({ a: 1 })).to.throw();

    });

});
