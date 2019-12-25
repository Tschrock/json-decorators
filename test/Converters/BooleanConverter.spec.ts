import 'reflect-metadata';

import { describe, it } from 'mocha';
import { expect } from 'chai';

import { BooleanConverter } from '../../src';

const converter = new BooleanConverter();

describe('BooleanConverter', () => {

    it('should read a boolean', () => {
        const result = converter.ReadJson(true);
        expect(result).to.be.true;
    });

    it('should write a boolean', () => {
        const result = converter.WriteJson(true);
        expect(result).to.be.true;
    });

    it('should throw an error when reading things that aren\'t boolean', () => {

        expect(() => converter.ReadJson(1)).to.throw();
        expect(() => converter.ReadJson("asdf")).to.throw();
        expect(() => converter.ReadJson([0])).to.throw();
        expect(() => converter.ReadJson({ a: 1 })).to.throw();

    });

});
