import 'reflect-metadata';

import { describe, it } from 'mocha';
import { expect } from 'chai';

import { ISODateConverter } from '../../src';

const converter = new ISODateConverter();

describe('ISODateConverter', () => {

    it('should read a Date', () => {
        const result = converter.ReadJson("2019-11-22T19:03:31.000Z");
        expect(result.valueOf()).to.equal(1574449411000);
    });

    it('should write a Date', () => {
        const result = converter.WriteJson(new Date(1574449411000));
        expect(result).to.equal("2019-11-22T19:03:31.000Z");
    });

    it('should throw an error when reading things that aren\'t Dates', () => {

        expect(() => converter.ReadJson(1.035)).to.throw();
        expect(() => converter.ReadJson(true)).to.throw();
        expect(() => converter.ReadJson("asdf")).to.throw();
        expect(() => converter.ReadJson([0])).to.throw();
        expect(() => converter.ReadJson({ a: 1 })).to.throw();

    });

});

