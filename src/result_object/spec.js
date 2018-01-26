'use strict';

import ResultObject from './index';
import { expect } from 'chai';

describe('Test PassableResponse class', () => {
    it('Should return correct initial object from constructor', () => {
        expect(new ResultObject('FormName')).to.deep.equal({
            name: 'FormName',
            hasValidationErrors: false,
            hasValidationWarnings: false,
            failCount: 0,
            warnCount: 0,
            testCount: 0,
            testsPerformed: {},
            validationErrors: {},
            validationWarnings: {},
            skipped: []
        });
    });

    describe('Test initFieldCounters method', () => {
        let testObject;
        beforeEach(() => testObject = new ResultObject('FormName').initFieldCounters('example'));
        it('Should add new fields and its counters to `testsPerformed`', () => {

            expect(testObject.testsPerformed).to.deep.equal({
                example: {
                    failCount: 0,
                    testCount: 0,
                    warnCount: 0
                }
            });
        });

        it('Should keep field counters untouched if they already exist', () => {
            Object.assign(testObject.testsPerformed.example, {
                failCount: 5,
                testCount: 5
            });

            expect(testObject.testsPerformed).to.deep.equal({
                example: {
                    failCount: 5,
                    testCount: 5,
                    warnCount: 0
                }
            });
        });
    });

    describe('Test bumpTestCounters method', () => {
        let testObject;
        beforeEach(() => testObject = new ResultObject('FormName').initFieldCounters('example'));

        it('Should bump test counters in `testsPerformed`', () => {
            testObject.bumpTestCounter('example');
            expect(testObject.testsPerformed).to.deep.equal({
                example: {
                    failCount: 0,
                    testCount: 1,
                    warnCount: 0
                }
            });
        });

        it('Should bump test counters in `testCount` from `0` to `1`', () => {
            expect(testObject.testCount).to.equal(0);
            testObject.bumpTestCounter('example');
            expect(testObject.testCount).to.equal(1);
        });
    });

    describe('Test getErrors method', () => {
        let testObject;
        beforeEach(() => {
            testObject = new ResultObject('FormName')
                .initFieldCounters('example')
                .initFieldCounters('example_2')
                .fail('example', 'Error string', 'fail');
        });

        it('Should return errors array for a field with errors', () => {
            expect(testObject.getErrors('example')).to.deep.equal(['Error string']);
        });

        it('Should return empty array for a field with no errors', () => {
            expect(testObject.getErrors('example_2')).to.deep.equal([]);
        });

        it('Should return all errors object when no field specified', () => {
            expect(testObject.getErrors()).to.deep.equal({
                example: ['Error string']
            });
        });
    });

    describe('Test getErrors method', () => {
        let testObject;
        beforeEach(() => {
            testObject = new ResultObject('FormName')
                .initFieldCounters('example')
                .initFieldCounters('example_2')
                .fail('example', 'Error string', 'warn');
        });

        it('Should return errors array for a field with errors', () => {
            expect(testObject.getWarnings('example')).to.deep.equal(['Error string']);
        });

        it('Should return empty array for a field with no errors', () => {
            expect(testObject.getWarnings('example_2')).to.deep.equal([]);
        });

        it('Should return all errors object when no field specified', () => {
            expect(testObject.getWarnings()).to.deep.equal({
                example: ['Error string']
            });
        });
    });
});