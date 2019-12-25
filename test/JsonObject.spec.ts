import 'reflect-metadata';

import { describe, it } from 'mocha';
import { expect } from 'chai';

import { JsonObject } from '../src';
import { MetadataKey } from '../src/Metadata';

@JsonObject
class Test1 { }

@JsonObject()
class Test2 { }

describe('@JsonObject', () => {

    it('should mark class as serializable', () => {
        const result = Reflect.getMetadata(MetadataKey.JSON_OBJECT, Test1.prototype);
        expect(result).to.be.true
    });

});
describe('@JsonObject()', () => {

    it('should mark class as serializable', () => {
        const result = Reflect.getMetadata(MetadataKey.JSON_OBJECT, Test2.prototype);
        expect(result).to.be.true;
    });

});
