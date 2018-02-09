'use strict';

import passable from '../index.js';
import { expect } from 'chai';

describe('Test running specific tests', () => {
    describe('Test array input', () => {

        it('Should only run first test', () => {
            const result = specificTests(['First']);

            expect(result.skipped).to.deep.equal(['Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh']);
            expect(result.testCount).to.equal(1);
        });

        it('Should run Second, Third and Seventh Test', () => {
            const result = specificTests(['Second', 'Third', 'Seventh']);

            expect(result.skipped).to.deep.equal(['First', 'Fourth', 'Fifth', 'Sixth']);
            expect(result.testCount).to.equal(3);
        });

        it('Should skip all tests', () => {
            const result = specificTests(['IDoNotExist']);

            expect(result.skipped).to.deep.equal(['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh']);
            expect(result.testCount).to.equal(0);
        });

        it('Should run all tests', () => {
            const result = specificTests([]);

            expect(result.skipped).to.deep.equal([]);
            expect(result.testCount).to.equal(8);
        });
    });

    describe('Test string input', () => {

        it('Should only run first test', () => {
            const result = specificTests('First');

            expect(result.skipped).to.deep.equal(['Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh']);
            expect(result.testCount).to.equal(1);
        });

        it('Should skip all tests', () => {
            const result = specificTests('IDoNotExist');

            expect(result.skipped).to.deep.equal(['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh']);
            expect(result.testCount).to.equal(0);
        });

        it('Should run all tests', () => {
            const result = specificTests('');

            expect(result.skipped).to.deep.equal([]);
            expect(result.testCount).to.equal(8);
        });
    });

    describe('Test object input', () => {

        it('Should only run first test', () => {
            const result = specificTests({
                only: 'First'
            });

            expect(result.skipped).to.deep.equal(['Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh']);
            expect(result.testCount).to.equal(1);
        });

        it('Should run Second, Third and Seventh Test', () => {
            const result = specificTests({
                only: ['Second', 'Third', 'Seventh']
            });

            expect(result.skipped).to.deep.equal(['First', 'Fourth', 'Fifth', 'Sixth']);
            expect(result.testCount).to.equal(3);
        });

        it('Should skip all tests', () => {
            const result = specificTests({
                only: 'IDoNotExist'
            });

            expect(result.skipped).to.deep.equal(['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh']);
            expect(result.testCount).to.equal(0);
        });

        it('Should skip Second and Fourth', () => {
            const result = specificTests({
                not: ['Second', 'Fourth']
            });

            expect(result.skipped).to.deep.equal(['Second', 'Fourth']);
            expect(result.testCount).to.equal(6);
        });

        it('Should skip First', () => {
            const result = specificTests({
                not: 'First'
            });

            expect(result.skipped).to.deep.equal(['First']);
            expect(result.testCount).to.equal(7);
        });
    });

    it('Should run all tests', () => {
        const result = specificTests(null);

        expect(result.skipped).to.deep.equal([]);
        expect(result.testCount).to.equal(8);
    });
});

function specificTests(specific) {
    return passable('specificTests', specific, (test, enforce) => {
        test('First', 'should pass', () => true);
        test('Second', 'should pass', () => true);
        test('Third', 'should fail', () => false);
        test('Fourth', 'should fail', () => false);
        test('Fifth', 'should fail', () => false);
        test('Sixth', 'should pass', () => true);
        test('Sixth', 'should pass', () => true); // twice!
        test('Seventh', 'should pass', () => true);
    });
};
