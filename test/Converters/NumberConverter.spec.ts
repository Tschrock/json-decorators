import 'reflect-metadata';

import { describe, it } from 'mocha';
import { expect } from 'chai';

import { NumberConverter } from '../../src';

const converter = new NumberConverter();

describe('NumberConverter', () => {

    it('should read a number', () => {
        const result = converter.ReadJson(1.5);
        expect(result).to.equal(1.5);
    });

    it('should write a number', () => {
        const result = converter.WriteJson(1.5);
        expect(result).to.equal(1.5);
    });

    it('should throw an error when reading things that aren\'t a number', () => {

        expect(() => converter.ReadJson(true)).to.throw();
        expect(() => converter.ReadJson("asdf")).to.throw();
        expect(() => converter.ReadJson([0])).to.throw();
        expect(() => converter.ReadJson({ a: 1 })).to.throw();

    });

});
