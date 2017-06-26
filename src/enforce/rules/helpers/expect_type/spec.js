'use strict';

import chai from 'chai';
import expectType from './index';

const expect = chai.expect;

const noop = () => undefined;

const throws = {
    array: () => expectType(true, 'array', 'spec'),
    string: () => expectType([], 'string', 'spec'),
    func: () => expectType('text', 'function', 'spec'),
    bool: () => expectType(noop, 'boolean', 'spec'),
    obj: () => expectType(false, 'object', 'spec')
};

const noThrow = {
    array: expectType([], 'array', 'spec'),
    string: expectType('[]', 'string', 'spec'),
    func: expectType(noop, 'function', 'spec'),
    bool: expectType(true, 'boolean', 'spec'),
    obj: expectType({}, 'object', 'spec')
};

describe('Tests expect type helper', () => {

    it('Should throw a TypeError for a type mismatch', () => {
        expect(throws.array).to.throw(TypeError);
        expect(throws.string).to.throw(TypeError);
        expect(throws.func).to.throw(TypeError);
        expect(throws.bool).to.throw(TypeError);
        expect(throws.obj).to.throw(TypeError);
    });

    it('Should return true for a type match', () => {
        expect(noThrow.array).to.equal(true);
        expect(noThrow.string).to.equal(true);
        expect(noThrow.func).to.equal(true);
        expect(noThrow.bool).to.equal(true);
        expect(noThrow.obj).to.equal(true);
    });
});