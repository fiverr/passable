import passable from '../index.js';
import { expect } from 'chai';

describe('Test running specific tests', () => {
    describe('Test array input', () => {

        it('Should only run first test', () => {
            const output = specificTests(['First']);

            expect(output.skipped).to.deep.equal(['Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh']);
            expect(output.testCount).to.equal(1);
        });

        it('Should run Second, Third and Seventh Test', () => {
            const output = specificTests(['Second', 'Third', 'Seventh']);

            expect(output.skipped).to.deep.equal(['First', 'Fourth', 'Fifth', 'Sixth']);
            expect(output.testCount).to.equal(3);
        });

        it('Should skip all tests', () => {
            const output = specificTests(['IDoNotExist']);

            expect(output.skipped).to.deep.equal(['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh']);
            expect(output.testCount).to.equal(0);
        });

        it('Should run all tests', () => {
            const output = specificTests([]);

            expect(output.skipped).to.deep.equal([]);
            expect(output.testCount).to.equal(8);
        });
    });

    describe('Test string input', () => {

        it('Should only run first test', () => {
            const output = specificTests('First');

            expect(output.skipped).to.deep.equal(['Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh']);
            expect(output.testCount).to.equal(1);
        });

        it('Should skip all tests', () => {
            const output = specificTests('IDoNotExist');

            expect(output.skipped).to.deep.equal(['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh']);
            expect(output.testCount).to.equal(0);
        });

        it('Should run all tests', () => {
            const output = specificTests('');

            expect(output.skipped).to.deep.equal([]);
            expect(output.testCount).to.equal(8);
        });
    });

    describe('Test object input', () => {

        it('Should only run first test', () => {
            const output = specificTests({
                only: 'First'
            });

            expect(output.skipped).to.deep.equal(['Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh']);
            expect(output.testCount).to.equal(1);
        });

        it('Should run Second, Third and Seventh Test', () => {
            const output = specificTests({
                only: ['Second', 'Third', 'Seventh']
            });

            expect(output.skipped).to.deep.equal(['First', 'Fourth', 'Fifth', 'Sixth']);
            expect(output.testCount).to.equal(3);
        });

        it('Should skip all tests', () => {
            const output = specificTests({
                only: 'IDoNotExist'
            });

            expect(output.skipped).to.deep.equal(['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh']);
            expect(output.testCount).to.equal(0);
        });

        it('Should skip Second and Fourth', () => {
            const output = specificTests({
                not: ['Second', 'Fourth']
            });

            expect(output.skipped).to.deep.equal(['Second', 'Fourth']);
            expect(output.testCount).to.equal(6);
        });

        it('Should skip First', () => {
            const output = specificTests({
                not: 'First'
            });

            expect(output.skipped).to.deep.equal(['First']);
            expect(output.testCount).to.equal(7);
        });
    });

    it('Should run all tests', () => {
        const output = specificTests(null);

        expect(output.skipped).to.deep.equal([]);
        expect(output.testCount).to.equal(8);
    });
});

function specificTests(specific) {
    return passable('specificTests', (test) => {
        test('First', 'should pass', () => true);
        test('Second', 'should pass', () => true);
        test('Third', 'should fail', () => false);
        test('Fourth', 'should fail', () => false);
        test('Fifth', 'should fail', () => false);
        test('Sixth', 'should pass', () => true);
        test('Sixth', 'should pass', () => true); // twice!
        test('Seventh', 'should pass', () => true);
    }, specific);
};
