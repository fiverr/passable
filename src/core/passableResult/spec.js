import passable from '../..';
import passableResult from './index';
import { WARN, FAIL } from '../../constants';
import { expect } from 'chai';
import { excludeFromResult } from '../../../config/test-setup';
import { noop } from 'lodash';
import sinon from 'sinon';
import faker from 'faker';

describe('module: passableResult', () => {
    it('Should return correct initial object from constructor', () => {
        expect(passableResult('FormName').output)
            .excluding(excludeFromResult).to.deep.equal({
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


    ['done', 'getErrors', 'getWarnings', 'hasErrors', 'hasWarnings'].forEach((method) => {
        it(`Should expose ${method} method`, () => {
            const res = passableResult(faker.lorem.word());
            expect(typeof res.output[method]).to.equal('function');
        });
    });

    describe('method: initFieldCounters', () => {
        let testObject;
        beforeEach(() => {
            testObject = passableResult('FormName');
            testObject.initFieldCounters('example');
        });
        it('Should add new fields and its counters to `testsPerformed`', () => {

            expect(testObject.output.testsPerformed).to.deep.equal({
                example: {
                    failCount: 0,
                    testCount: 0,
                    warnCount: 0
                }
            });
        });

        it('Should keep field counters untouched if they already exist', () => {
            Object.assign(testObject.output.testsPerformed.example, {
                failCount: 5,
                testCount: 5
            });

            expect(testObject.output.testsPerformed).to.deep.equal({
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
        beforeEach(() => {
            testObject = passableResult('FormName');
            testObject.initFieldCounters('example');
        });

        it('Should bump test counters in `testsPerformed`', () => {
            testObject.bumpTestCounter('example');
            expect(testObject.output.testsPerformed).to.deep.equal({
                example: {
                    failCount: 0,
                    testCount: 1,
                    warnCount: 0
                }
            });
        });

        it('Should bump test counters in `testCount` from `0` to `1`', () => {
            expect(testObject.output.testCount).to.equal(0);
            testObject.bumpTestCounter('example');
            expect(testObject.output.testCount).to.equal(1);
        });
    });

    describe('method: addToSkipped', () => {
        let testObject;
        beforeEach(() => testObject = passableResult('FormName'));

        it('Should have added field in skipped list', () => {
            testObject.addToSkipped('field_1');
            expect(testObject.output.skipped).to.include('field_1');
        });

        it('Should have added fields in skipped list', () => {
            testObject.addToSkipped('field_1');
            testObject.addToSkipped('field_2');
            expect(testObject.output.skipped).to.include('field_1');
            expect(testObject.output.skipped).to.include('field_2');
        });

        it('Should uniquely add each field', () => {
            testObject.addToSkipped('field_1');
            testObject.addToSkipped('field_2');
            testObject.addToSkipped('field_1');
            testObject.addToSkipped('field_2');
            expect(testObject.output.skipped).to.have.lengthOf(2);
        });
    });

    describe('method: runCompletionCallbacks', () => {
        let res;

        beforeEach(() => {
            res = passableResult(faker.lorem.word());
            res.markAsync();
        });

        it('Should run all functions in `completionCallbacks` list', () => {

            const fn1 = sinon.spy();
            const fn2 = sinon.spy();
            const fn3 = sinon.spy();
            res.output.done(fn1).done(fn2).done(fn3);
            res.runCompletionCallbacks();
            expect(fn1.calledOnce).to.equal(true);
            expect(fn2.calledOnce).to.equal(true);
            expect(fn3.calledOnce).to.equal(true);
        });

        it('Should pass current passableResult instance to the callback', () => {
            res.output.done((instance) => {
                expect(instance).to.deep.equal(res.output);
            });

            res.runCompletionCallbacks();
        });
    });

    describe('method: done', () => {
        let res;

        beforeEach(() => {
            res = passableResult(faker.lorem.word());
        });

        it('Should allow chaining by returning self', () => {
            expect(res.output.done(noop)).to.deep.equal(res.output);
        });

        it('Should run done callback when done', (done) => {
            const startTime = Date.now();
            passable(faker.lorem.word(), (test) => {
                test(faker.lorem.word(), faker.lorem.sentence(), new Promise((resolve) => {
                    setTimeout(resolve, 250);
                }));

                test(faker.lorem.word(), faker.lorem.sentence(), new Promise((reject) => {
                    setTimeout(reject, 500);
                }));
            }).done(() => {
                expect(Date.now() - startTime).to.be.at.least(500);
                done();
            });
        });

        it('Should return silently for non-function values', (done) => {
            [0, 1, null, undefined, new Promise(noop), false, true, [], {}]
                .forEach((v) => res.output.done(v));
            done();
        });

        describe('When async', () => {
            it('Should wait for tests to finish', (done) => {
                const startTime = Date.now();
                res.markAsync();
                setTimeout(() => {
                    res.runCompletionCallbacks();
                }, 250);
                res.output.done(() => {
                    expect(Date.now() - startTime).to.be.at.least(250);
                    done();
                });
            });
        });

        describe('When sync', () => {
            it('Should run callbacks immediately', (done) => {
                res.output.done(() => done());
                throw new Error(); // this proves that it is invoked immediately
            });

            it('Should run all callbacks in sequence', () => {
                const values = [];
                res.output.done(() => values.push(1));
                res.output.done(() => values.push(2));
                res.output.done(() => values.push(3));
                res.output.done(() => values.push(4));
                expect(values).to.deep.equal([1, 2, 3, 4]);
            });
        });
    });

    describe('method: after', () => {
        let res, f1, f2;

        beforeEach(() => {
            f1 = faker.lorem.word();
            f2 = faker.lorem.word();

            res = passable(faker.lorem.word(), (test) => {
                test(f1, faker.lorem.sentence(), new Promise((resolve, reject) => setTimeout(reject, 100)));
                test(f2, faker.lorem.sentence(), noop);
                test(f2, faker.lorem.sentence(), new Promise((resolve) => setTimeout(resolve)));
                test(f2, faker.lorem.sentence(), new Promise((resolve, reject) => setTimeout(reject, 250)));
                test('sync', faker.lorem.sentence(), noop);
            });
        });

        describe('Single test with given field name (f1)', () => {
            it('Should only run callback after field completed', (done) => {
                res.after(f1, (res) => {
                    if (res.hasErrors(f1)) { done(); }
                });
            });
        });

        describe('Multiple tests with given field name (f2)', () => {
            it('Should only run callback after all tests completed for given field', (done) => {
                res.after(f2, (res) => {
                    expect(res.testsPerformed[f2].testCount).to.equal(3);
                    done();
                });
            });
        });

        describe('Sync only test', () => {
            it('Should invoke immediately', (done) => {
                res.after('sync', () => done());
                throw new Error();
            });
        });

        describe('Return value', () => {
            it('Should return self', () => {
                expect(res.after('sync', noop)).to.deep.equal(res);
            });
        });

        describe('Invalid values', () => {
            it('Should return self', () => {
                expect(res.after('s')).to.deep.equal(res);
                expect(res.after('s', 's')).to.deep.equal(res);
            });
        });

        describe('Callback arguments', () => {
            it('Should pass down result object to callback', (done) => {
                res.after(f1, (result) => {
                    expect(result).to.equal(res);
                    done();
                });
            });
        });
    });

    describe('method: getErrors', () => {
        let testObject;
        beforeEach(() => {
            testObject = passableResult('FormName');
            testObject.initFieldCounters('example');
            testObject.initFieldCounters('example_2');
            testObject.fail('example', 'Error string', FAIL);
        });

        it('Should return errors array for a field with errors', () => {
            expect(testObject.output.getErrors('example')).to.deep.equal(['Error string']);
        });

        it('Should return empty array for a field with no errors', () => {
            expect(testObject.output.getErrors('example_2')).to.deep.equal([]);
        });

        it('Should return all errors object when no field specified', () => {
            expect(testObject.output.getErrors()).to.deep.equal({
                example: ['Error string']
            });
        });
    });

    describe('method: getWarnings', () => {
        let testObject;
        beforeEach(() => {
            testObject = passableResult('FormName');
            testObject.initFieldCounters('example');
            testObject.initFieldCounters('example_2');
            testObject.fail('example', 'Error string', WARN);
        });

        it('Should return errors array for a field with errors', () => {
            expect(testObject.output.getWarnings('example')).to.deep.equal(['Error string']);
        });

        it('Should return empty array for a field with no errors', () => {
            expect(testObject.output.getWarnings('example_2')).to.deep.equal([]);
        });

        it('Should return all errors object when no field specified', () => {
            expect(testObject.output.getWarnings()).to.deep.equal({
                example: ['Error string']
            });
        });
    });

    describe('method: hasErrors', () => {
        let testObject;
        beforeEach(() => {
            testObject = passableResult('FormName');
            testObject.initFieldCounters('example');
            testObject.initFieldCounters('example_2');
            testObject.fail('example', 'Error string', FAIL);
        });

        describe('Field specified', () => {
            it('Should return true for a field with errors', () => {
                expect(testObject.output.hasErrors('example')).to.equal(true);
            });

            it('Should return false for a field without errors', () => {
                expect(testObject.output.hasErrors('example_2')).to.equal(false);
            });
        });

        describe('Field not specified', () => {
            it('Should return true if errors exist', () => {
                expect(testObject.output.hasErrors()).to.equal(true);
            });
        });

        describe('Specified field does not exist', () => {
            it('Should return false', () => {
                expect(testObject.output.hasErrors('nonexistent')).to.equal(false);
            });
        });
    });

    describe('method: hasWarnings', () => {
        let testObject;
        beforeEach(() => {
            testObject = passableResult('FormName');
            testObject.initFieldCounters('example');
            testObject.initFieldCounters('example_2');
            testObject.fail('example', 'Error string', WARN);
        });

        describe('Field specified', () => {
            it('Should return true for a field with errors', () => {
                expect(testObject.output.hasWarnings('example')).to.equal(true);
            });

            it('Should return false for a field without errors', () => {
                expect(testObject.output.hasWarnings('example_2')).to.equal(false);
            });
        });

        describe('Field not specified', () => {
            it('Should return true if errors exist', () => {
                expect(testObject.output.hasWarnings()).to.equal(true);
            });
        });

        describe('Specified field does not exist', () => {
            it('Should return false', () => {
                expect(testObject.output.hasWarnings('nonexistent')).to.equal(false);
            });
        });
    });

    describe('method: fail', () => {

        let testObject;

        beforeEach(() => {
            testObject = passableResult('FormName');
            testObject.initFieldCounters('f1');
        });

        it('Should return correct failing object', () => {
            testObject.fail('f1', 'should fail', FAIL);

            expect(testObject.output)
                .excluding(excludeFromResult)
                .to.deep.equal({
                    name: 'FormName',
                    testCount: 0,
                    failCount: 1,
                    warnCount: 0,
                    hasValidationErrors: true,
                    hasValidationWarnings: false,
                    testsPerformed: {
                        f1: { failCount: 1, warnCount: 0, testCount: 0 }
                    },
                    validationErrors: { f1: ['should fail'] },
                    validationWarnings: {},
                    skipped: []
                });
        });

        it('Should return correct warning object', () => {
            testObject.fail('f1', 'should warn', WARN);
            expect(testObject.output)
                .excluding(excludeFromResult)
                .to.deep.equal({
                    name: 'FormName',
                    testCount: 0,
                    failCount: 0,
                    warnCount: 1,
                    hasValidationErrors: false,
                    hasValidationWarnings: true,
                    testsPerformed: {
                        f1: { failCount: 0, warnCount: 1, testCount: 0 }
                    },
                    validationErrors: {},
                    validationWarnings: { f1: ['should warn'] },
                    skipped: []
                });
        });

        it('Should return and keep object unchanged if field does not exist', () => {
            const testObject = passableResult('FormName');
            testObject.fail('f1', 'I do not exist');

            expect(testObject.output)
                .excluding(excludeFromResult)
                .to.deep.equal(passableResult('FormName').output);
        });
    });

    describe('methods: bumpTestWarning and bumpTestError', () => {

        let testObject;

        beforeEach(() => {
            testObject = passableResult('FormName');
            testObject.initFieldCounters('f1');
        });

        it('#bumpTestWarning Should correctly update instance with field\'s warnings', () => {
            testObject.bumpTestWarning('f1', 'should warn');

            expect(testObject.output)
                .excluding(excludeFromResult)
                .to.deep.equal({
                    name: 'FormName',
                    testCount: 0,
                    failCount: 0,
                    warnCount: 1,
                    hasValidationErrors: false,
                    hasValidationWarnings: true,
                    testsPerformed: {
                        f1: { failCount: 0, warnCount: 1, testCount: 0 }
                    },
                    validationErrors: {},
                    validationWarnings: { f1: ['should warn'] },
                    skipped: []
                });
        });

        it('#bumpTestError Should correctly update instance with field\'s error', () => {
            testObject.bumpTestError('f1', 'should error');

            expect(testObject.output)
                .excluding(excludeFromResult)
                .to.deep.equal({
                    name: 'FormName',
                    testCount: 0,
                    failCount: 1,
                    warnCount: 0,
                    hasValidationErrors: true,
                    hasValidationWarnings: false,
                    testsPerformed: {
                        f1: { failCount: 1, warnCount: 0, testCount: 0 }
                    },
                    validationErrors: { f1: ['should error'] },
                    validationWarnings: {},
                    skipped: []
                });
        });
    });
});