import 'reflect-metadata';

import { describe, it } from 'mocha';
import { expect } from 'chai';

import { JsonValueConverter } from '../../src';

const converter = new JsonValueConverter();

describe('JsonValueConverter', () => {

    it('should read json values', () => {
        expect(converter.ReadJson(1)).to.equal(1);
        expect(converter.ReadJson("1")).to.equal("1");
        expect(converter.ReadJson(true)).to.equal(true);
        expect(converter.ReadJson(false)).to.equal(false);
        expect(converter.ReadJson([1])).to.deep.equal([1]);
        expect(converter.ReadJson({ d: 1 })).to.deep.equal({ d: 1 });
    });

    it('should write json values', () => {
        expect(converter.WriteJson(1)).to.equal(1);
        expect(converter.WriteJson("1")).to.equal("1");
        expect(converter.WriteJson(true)).to.equal(true);
        expect(converter.WriteJson(false)).to.equal(false);
        expect(converter.WriteJson([1])).to.deep.equal([1]);
        expect(converter.WriteJson({ d: 1 })).to.deep.equal({ d: 1 });
    });

});
