import faker from 'faker';
import { expect } from 'chai';
import isTestFn from '.';

describe('isTestFn module', () => {

    describe('When argument is a function', () => {
        it('Should return true', () => {
            expect(isTestFn(Function.prototype)).to.equal(true);
        });
    });

    describe('When argument is a Promise', () => {
        it('Should return true', () => {
            expect(isTestFn(new Promise(() => null))).to.equal(true);
        });
    });

    describe('When argument is any other type', () => {
        expect([
            { [faker.lorem.word()]: faker.lorem.word() },
            [faker.lorem.word()],
            1,
            faker.lorem.word(),
            true,
            null,
            NaN
        ].some(isTestFn)).to.equal(false);
    });
});
