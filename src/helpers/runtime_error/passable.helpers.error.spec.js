import runtimeError from './index';
import { expect } from 'chai';

describe('runtimeError function', () => {
    it('Should default to a general error', () => {
        const error = "[Passable]: Failed to execute 'Passable': General exception.";

        expect(runtimeError([1]).message).to.equal(error);
        expect(runtimeError(runtimeError).message).to.equal(error);
        expect(runtimeError(99).message).to.equal(error);
        expect(runtimeError(null).message).to.equal(error);
    });
});