'use strict';

import ResultObject, { WARN, FAIL } from './index';
import { expect } from 'chai';
import { noop } from 'lodash';
import sinon from 'sinon';
import faker from 'faker';

describe('class: PassableResponse', () => {
    it('Should return correct initial object from constructor', () => {
        expect(new ResultObject('FormName')).to.deep.equal({
            name: 'FormName',
            async: null,
            hasValidationErrors: false,
            hasValidationWarnings: false,
            failCount: 0,
            warnCount: 0,
            testCount: 0,
            testsPerformed: {},
            validationErrors: {},
            validationWarnings: {},
            skipped: [],
            completionCallbacks: []
        });
    });


    ['done', 'getErrors', 'getWarnings', 'hasErrors', 'hasWarnings'].forEach((method) => {
        it(`Should expose ${method} method`, () => {
            const res = new ResultObject(faker.lorem.word());
            expect(typeof res[method]).to.equal('function');
        });
    });

    describe('method: initFieldCounters', () => {
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

    describe('method: bumpTestCounters', () => {
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

    describe('method: addToSkipped', () => {
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

    describe('method: runCompletionCallbacks', () => {
        let res;

        beforeEach(() => {
            res = new ResultObject(faker.lorem.word());
            res.markAsync();
        });

        it('Should run all functions in `completionCallbacks` list', () => {

            const fn1 = sinon.spy();
            const fn2 = sinon.spy();
            const fn3 = sinon.spy();
            res.done(fn1).done(fn2).done(fn3);
            res.runCompletionCallbacks();
            expect(fn1.calledOnce).to.equal(true);
            expect(fn2.calledOnce).to.equal(true);
            expect(fn3.calledOnce).to.equal(true);
        });

        it('Should pass current ResultObject instance to the callback', () => {
            res.done((instance) => {
                expect(res).to.equal(instance);
            });
            res.runCompletionCallbacks();
        });
    });

    describe('method: done', () => {
        let res;

        beforeEach(() => {
            res = new ResultObject(faker.lorem.word());
        });

        it('Should add given callback to `completionCallbackList`', () => {
            expect(res.completionCallbacks).to.have.lengthOf(0);
            res.done(noop);
            expect(res.completionCallbacks).to.have.lengthOf(1);
            res.completionCallbacks[0] === noop;
        });

        it('Should return without adding non-function values', () => {
            [0, 1, null, undefined, new Promise(noop), false, true, [], {}].forEach((v) => res.done(v));
            expect(res.completionCallbacks).to.have.lengthOf(0);
        });

        describe('When async', () => {
            it('Should push given callback as last element in the array', (done) => {
                res.markAsync();
                res.done(noop);
                res.done(() => done());

                res.completionCallbacks[1]();
            });
        });

        describe('When sync', () => {
            it('Should run callbacks immediately', (done) => {
                res.done(() => done());
            });
        });

    });

    describe('method: getErrors', () => {
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

    describe('method: getWarnings', () => {
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

    describe('method: hasErrors', () => {
        let testObject;
        beforeEach(() => {
            testObject = new ResultObject('FormName')
                .initFieldCounters('example')
                .initFieldCounters('example_2')
                .fail('example', 'Error string', FAIL);
        });

        describe('Field specified', () => {
            it('Should return errors array for a field with errors', () => {
                expect(testObject.hasErrors('example')).to.equal(true);
            });

            it('Should return empty array for a field with no errors', () => {
                expect(testObject.hasErrors('example_2')).to.equal(false);
            });
        });

        describe('Field not specified', () => {
            it('Should return all errors object', () => {
                expect(testObject.hasErrors()).to.equal(true);
            });
        });
    });

    describe('method: hasWarnings', () => {
        let testObject;
        beforeEach(() => {
            testObject = new ResultObject('FormName')
                .initFieldCounters('example')
                .initFieldCounters('example_2')
                .fail('example', 'Error string', WARN);
        });

        describe('Field specified', () => {
            it('Should return errors array for a field with errors', () => {
                expect(testObject.hasWarnings('example')).to.equal(true);
            });

            it('Should return empty array for a field with no errors', () => {
                expect(testObject.hasWarnings('example_2')).to.equal(false);
            });
        });

        describe('Field not specified', () => {
            it('Should return all errors object', () => {
                expect(testObject.hasWarnings()).to.equal(true);
            });
        });
    });

    describe('method: fail', () => {

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
                async: null,
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
                skipped: [],
                completionCallbacks: []
            });
        });

        it('Should return correct warning object', () => {
            const warn = testObject.fail('f1', 'should warn', WARN);
            expect(warn).to.deep.equal({
                name: 'FormName',
                async: null,
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
                skipped: [],
                completionCallbacks: []
            });
        });

        it('Should return and keep object unchanged if field does not exist', () => {
            const testObject = new ResultObject('FormName');
            testObject.fail('f1', 'I do not exist');

            expect(testObject).to.deep.equal(new ResultObject('FormName'));
        });
    });

    describe('methods: bumpTestWarning and bumpTestError', () => {

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
                async: null,
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
                skipped: [],
                completionCallbacks: []
            });
        });

        it('#bumpTestError Should correctly update instance with field\'s error', () => {
            testObject.bumpTestError('f1', 'should error');

            expect(testObject).to.deep.equal({
                name: 'FormName',
                async: null,
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
                skipped: [],
                completionCallbacks: []
            });
        });
    });
});