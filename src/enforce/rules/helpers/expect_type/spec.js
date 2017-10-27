'use strict';

import { expect } from 'chai';
import expectType from './index';

const noop = () => undefined;

const throws = {
    array: expectType.bind(null, true, 'array', 'spec'),
    string: expectType.bind(null, [0], 'string', 'spec'),
    func: expectType.bind(null, 'text', 'function', 'spec'),
    bool: expectType.bind(null, noop, 'boolean', 'spec'),
    obj: expectType.bind(null, false, 'object', 'spec')
};

const noThrow = {
    array: expectType([], 'array', 'spec'),
    string: expectType('[]', 'string', 'spec'),
    func: expectType(noop, 'function', 'spec'),
    bool: expectType(true, 'boolean', 'spec'),
    obj: expectType({}, 'object', 'spec')
};

describe('Tests expect type helper', () => {

    const throwString = (...args) => `[Passable]: Failed to execute '${args[0]}': expected ${args[1]} to be a ${args[2]}`;

    it('Should throw a TypeError for a type mismatch', () => {
        expect(throws.array).to.throw(throwString('spec', 'true', 'array'));
        expect(throws.string).to.throw(throwString('spec', '[0]', 'string'));
        expect(throws.func).to.throw(throwString('spec', 'text', 'function'));
        expect(throws.bool).to.throw(throwString('spec', noop, 'boolean'));
        expect(throws.obj).to.throw(throwString('spec', 'false', 'object'));
    });

    it('Should return true for a type match', () => {
        expect(noThrow.array).to.equal(true);
        expect(noThrow.string).to.equal(true);
        expect(noThrow.func).to.equal(true);
        expect(noThrow.bool).to.equal(true);
        expect(noThrow.obj).to.equal(true);
    });
});