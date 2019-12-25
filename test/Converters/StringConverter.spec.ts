import 'reflect-metadata';

import { describe, it } from 'mocha';
import { expect } from 'chai';

import { StringConverter } from '../../src';

const converter = new StringConverter();

describe('StringConverter', () => {

    it('should read a string', () => {
        const result = converter.ReadJson("test");
        expect(result).to.equal("test");
    });

    it('should write a string', () => {
        const result = converter.WriteJson("test");
        expect(result).to.equal("test");
    });

    it('should throw an error when reading things that aren\'t a string', () => {

        expect(() => converter.ReadJson(1.035)).to.throw();
        expect(() => converter.ReadJson(true)).to.throw();
        expect(() => converter.ReadJson([0])).to.throw();
        expect(() => converter.ReadJson({ a: 1 })).to.throw();

    });

});
