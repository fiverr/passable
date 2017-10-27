import throwRuntimeError from './index';
import { expect } from 'chai';

describe('throwRuntimeError function', () => {
    it('Should default to a general error', () => {
        expect(throwRuntimeError.bind(null, [1])).to.throw("[Passable]: Failed to execute 'Passable': General exception.");
        expect(throwRuntimeError.bind(null, throwRuntimeError)).to.throw("[Passable]: Failed to execute 'Passable': General exception.");
        expect(throwRuntimeError.bind(null, 99)).to.throw("[Passable]: Failed to execute 'Passable': General exception.");
        expect(throwRuntimeError.bind(null)).to.throw("[Passable]: Failed to execute 'Passable': General exception.");
    });
});