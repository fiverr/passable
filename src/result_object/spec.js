'use strict';

import ResultObject, { WARN, FAIL } from './index';
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

    describe('Test addToSkipped method', () => {
        let testObject;
        beforeEach(() => testObject = new ResultObject('FormName'));

        it('Should have added field in skipped list', () => {
            testObject.addToSkipped('field_1');
            expect(testObject.skipped).to.include('field_1');
        });

        it('Should have added fields in skipped list', () => {
            testObject.addToSkipped('field_1').addToSkipped('field_2');
            expect(testObject.skipped).to.include('field_1');
            expect(testObject.skipped).to.include('field_2');
        });

        it('Should uniquely add each field', () => {
            testObject
                .addToSkipped('field_1')
                .addToSkipped('field_2')
                .addToSkipped('field_1')
                .addToSkipped('field_2');
            expect(testObject.skipped).to.have.lengthOf(2);
        });
    });

    describe('Test getErrors method', () => {
        let testObject;
        beforeEach(() => {
            testObject = new ResultObject('FormName')
                .initFieldCounters('example')
                .initFieldCounters('example_2')
                .fail('example', 'Error string', FAIL);
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
                .fail('example', 'Error string', WARN);
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

    describe('Test fail method', () => {

        let testObject;

        beforeEach(() => {
            testObject = new ResultObject('FormName');
            testObject.testsPerformed = {
                f1: {
                    failCount: 0,
                    warnCount: 0
                }
            };
        });

        it('Should return correct failing object', () => {
            const fail = testObject.fail('f1', 'should fail', FAIL);

            expect(fail).to.deep.equal({
                name: 'FormName',
                testCount: 0,
                failCount: 1,
                warnCount: 0,
                hasValidationErrors: true,
                hasValidationWarnings: false,
                testsPerformed: {
                    f1: { failCount: 1, warnCount: 0 }
                },
                validationErrors: { f1: ['should fail'] },
                validationWarnings: {},
                skipped: []
            });
        });

        it('Should return correct warning object', () => {
            const warn = testObject.fail('f1', 'should warn', WARN);
            expect(warn).to.deep.equal({
                name: 'FormName',
                testCount: 0,
                failCount: 0,
                warnCount: 1,
                hasValidationErrors: false,
                hasValidationWarnings: true,
                testsPerformed: {
                    f1: { failCount: 0, warnCount: 1 }
                },
                validationErrors: {},
                validationWarnings: { f1: ['should warn'] },
                skipped: []
            });
        });

        it('Should return and keep object unchanged if field does not exist', () => {
            const testObject = new ResultObject('FormName');
            testObject.fail('f1', 'I do not exist');

            expect(testObject).to.deep.equal(new ResultObject('FormName'));
        });
    });

    describe('Test bumpTestWarning and bumpTestError methods', () => {

        let testObject;

        beforeEach(() => {
            testObject = new ResultObject('FormName');
            testObject.testsPerformed = {
                f1: {
                    failCount: 0,
                    warnCount: 0
                }
            };
        });

        it('#bumpTestWarning Should correctly update instance with field\'s warnings', () => {
            testObject.bumpTestWarning('f1', 'should warn');

            expect(testObject).to.deep.equal({
                name: 'FormName',
                testCount: 0,
                failCount: 0,
                warnCount: 1,
                hasValidationErrors: false,
                hasValidationWarnings: true,
                testsPerformed: {
                    f1: { failCount: 0, warnCount: 1 }
                },
                validationErrors: {},
                validationWarnings: { f1: ['should warn'] },
                skipped: []
            });
        });

        it('#bumpTestError Should correctly update instance with field\'s error', () => {
            testObject.bumpTestError('f1', 'should error');

            expect(testObject).to.deep.equal({
                name: 'FormName',
                testCount: 0,
                failCount: 1,
                warnCount: 0,
                hasValidationErrors: true,
                hasValidationWarnings: false,
                testsPerformed: {
                    f1: { failCount: 1, warnCount: 0 }
                },
                validationErrors: { f1: ['should error'] },
                validationWarnings: {},
                skipped: []
            });
        });
    });
});