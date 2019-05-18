import Passable from '../../core/Passable';
import ResultObject, { WARN, FAIL } from './index';
import { expect } from 'chai';
import { noop } from 'lodash';
import sinon from 'sinon';
import faker from 'faker';

describe('class: ResultObject', () => {
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


    ['done', 'getErrors', 'getWarnings', 'hasErrors', 'hasWarnings'].forEach((method) => {
        it(`Should expose ${method} method`, () => {
            const { result } = new ResultObject(faker.lorem.word());
            expect(typeof result[method]).to.equal('function');
        });
    });

    describe('method: initFieldCounters', () => {
        let testObject;
        beforeEach(() => {
            testObject = new ResultObject('FormName')
            testObject.methods.initFieldCounters('example');
        });
        it('Should add new fields and its counters to `testsPerformed`', () => {

            expect(testObject.result.testsPerformed).to.deep.equal({
                example: {
                    failCount: 0,
                    testCount: 0,
                    warnCount: 0
                }
            });
        });

        it('Should keep field counters untouched if they already exist', () => {
            Object.assign(testObject.result.testsPerformed.example, {
                failCount: 5,
                testCount: 5
            });

            expect(testObject.result.testsPerformed).to.deep.equal({
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
            testObject = new ResultObject('FormName');
            testObject.methods.initFieldCounters('example');
        });

        it('Should bump test counters in `testsPerformed`', () => {
            testObject.methods.bumpTestCounter('example');
            expect(testObject.result.testsPerformed).to.deep.equal({
                example: {
                    failCount: 0,
                    testCount: 1,
                    warnCount: 0
                }
            });
        });

        it('Should bump test counters in `testCount` from `0` to `1`', () => {
            expect(testObject.result.testCount).to.equal(0);
            testObject.methods.bumpTestCounter('example');
            expect(testObject.result.testCount).to.equal(1);
        });
    });

    describe('method: addToSkipped', () => {
        let testObject;
        beforeEach(() => testObject = ResultObject('FormName'));

        it('Should have added field in skipped list', () => {
            testObject.methods.addToSkipped('field_1');
            expect(testObject.result.skipped).to.include('field_1');
        });

        it('Should have added fields in skipped list', () => {
            testObject.methods.addToSkipped('field_1');
            testObject.methods.addToSkipped('field_2');
            expect(testObject.result.skipped).to.include('field_1');
            expect(testObject.result.skipped).to.include('field_2');
        });

        it('Should uniquely add each field', () => {
            testObject.methods.addToSkipped('field_1');
            testObject.methods.addToSkipped('field_2');
            testObject.methods.addToSkipped('field_1');
            testObject.methods.addToSkipped('field_2');
            expect(testObject.result.skipped).to.have.lengthOf(2);
        });
    });

    describe('method: runCompletionCallbacks', () => {
        let res;

        beforeEach(() => {
            res = new ResultObject(faker.lorem.word());
            res.methods.markAsync();
        });

        it('Should run all functions in `completionCallbacks` list', () => {

            const fn1 = sinon.spy();
            const fn2 = sinon.spy();
            const fn3 = sinon.spy();
            res.result.done(fn1).done(fn2).done(fn3);
            res.methods.runCompletionCallbacks();
            expect(fn1.calledOnce).to.equal(true);
            expect(fn2.calledOnce).to.equal(true);
            expect(fn3.calledOnce).to.equal(true);
        });

        it('Should pass current ResultObject instance to the callback', () => {
            res.result.done((instance) => {
                expect(instance).to.equal(res.result);
            });

            res.methods.runCompletionCallbacks();
        });
    });

    describe('method: done', () => {
        let res;

        beforeEach(() => {
            res = new ResultObject(faker.lorem.word());
        });

        it('Should allow chaining by returning self', () => {
            expect(res.result.done(noop)).to.equal(res.result);
        });

        it('Should run done callback when done', (done) => {
            const startTime = Date.now();
            new Passable(faker.lorem.word(), (test) => {
                test(faker.lorem.word(), faker.lorem.sentence(), new Promise((resolve) => {
                    setTimeout(resolve, 250);
                }));

                test(faker.lorem.word(), faker.lorem.sentence(), new Promise((reject) => {
                    setTimeout(reject, 500);
                }));
            }).res.result.done(() => {
                expect(Date.now() - startTime).to.be.at.least(500);
                done();
            });
        });

        it('Should return silently for non-function values', (done) => {
            [0, 1, null, undefined, new Promise(noop), false, true, [], {}]
                .forEach((v) => res.result.done(v));
            done();
        });

        describe('When async', () => {
            it('Should wait for tests to finish', (done) => {
                const startTime = Date.now();
                res.methods.markAsync();
                setTimeout(() => {
                    res.methods.runCompletionCallbacks();
                }, 250);
                res.result.done(() => {
                    expect(Date.now() - startTime).to.be.at.least(250);
                    done();
                });
            });
        });

        describe('When sync', () => {
            it('Should run callbacks immediately', (done) => {
                res.result.done(() => done());
                throw new Error(); // this proves that it is invoked immediately
            });

            it('Should run all callbacks in sequence', () => {
                const values = [];
                res.result.done(() => values.push(1));
                res.result.done(() => values.push(2));
                res.result.done(() => values.push(3));
                res.result.done(() => values.push(4));
                expect(values).to.deep.equal([1, 2, 3, 4]);
            });
        });
    });

    describe('method: after', () => {
        let instance, f1, f2;

        beforeEach(() => {
            f1 = faker.lorem.word();
            f2 = faker.lorem.word();

            instance = new Passable(faker.lorem.word(), (test) => {
                test(f1, faker.lorem.sentence(), new Promise((resolve, reject) => setTimeout(reject, 100)));
                test(f2, faker.lorem.sentence(), noop);
                test(f2, faker.lorem.sentence(), new Promise((resolve) => setTimeout(resolve)));
                test(f2, faker.lorem.sentence(), new Promise((resolve, reject) => setTimeout(reject, 250)));
                test('sync', faker.lorem.sentence(), noop);
            });
        });

        describe('Single test with given field name (f1)', () => {
            it('Should only run callback after field completed', (done) => {
                instance.res.result.after(f1, (res) => {
                    if (instance.res.result.hasErrors(f1)) { done(); }
                });
            });
        });

        describe('Multiple tests with given field name (f2)', () => {
            it('Should only run callback after all tests completed for given field', (done) => {
                instance.res.result.after(f2, (res) => {
                    expect(res.result.testsPerformed[f2].testCount).to.equal(3);
                    done();
                });
            });
        });

        describe('Sync only test', () => {
            it('Should invoke immediately', (done) => {
                instance.res.result.after('sync', () => done());
                throw new Error();
            });
        });

        describe('Return value', () => {
            it('Should return self', () => {
                expect(instance.res.result.after('sync', noop)).to.equal(instance.res.result);
            });
        });

        describe('Invalid values', () => {
            it('Should return self', () => {
                expect(instance.res.result.after('s')).to.equal(instance.res.result);
                expect(instance.res.result.after('s', 's')).to.equal(instance.res.result);
            });
        });

        describe('Callback arguments', () => {
            it('Should pass down result object to callback', (done) => {
                instance.res.result.after(f1, (result) => {
                    expect(result).to.equal(instance.res.result);
                    done();
                });
            });
        });
    });

    describe('method: getErrors', () => {
        let testObject;
        beforeEach(() => {
            testObject = new ResultObject('FormName');
            testObject.methods.initFieldCounters('example');
            testObject.methods.initFieldCounters('example_2');
            testObject.methods.fail('example', 'Error string', FAIL);
        });

        it('Should return errors array for a field with errors', () => {
            expect(testObject.result.getErrors('example')).to.deep.equal(['Error string']);
        });

        it('Should return empty array for a field with no errors', () => {
            expect(testObject.result.getErrors('example_2')).to.deep.equal([]);
        });

        it('Should return all errors object when no field specified', () => {
            expect(testObject.result.getErrors()).to.deep.equal({
                example: ['Error string']
            });
        });
    });

    describe('method: getWarnings', () => {
        let testObject;
        beforeEach(() => {
            testObject = new ResultObject('FormName');
            testObject.methods.initFieldCounters('example');
            testObject.methods.initFieldCounters('example_2');
            testObject.methods.fail('example', 'Error string', WARN);
        });

        it('Should return errors array for a field with errors', () => {
            expect(testObject.result.getWarnings('example')).to.deep.equal(['Error string']);
        });

        it('Should return empty array for a field with no errors', () => {
            expect(testObject.result.getWarnings('example_2')).to.deep.equal([]);
        });

        it('Should return all errors object when no field specified', () => {
            expect(testObject.result.getWarnings()).to.deep.equal({
                example: ['Error string']
            });
        });
    });

    describe('method: hasErrors', () => {
        let testObject;
        beforeEach(() => {
            testObject = new ResultObject('FormName');
            testObject.methods.initFieldCounters('example');
            testObject.methods.initFieldCounters('example_2');
            testObject.methods.fail('example', 'Error string', FAIL);
        });

        describe('Field specified', () => {
            it('Should return true for a field with errors', () => {
                expect(testObject.result.hasErrors('example')).to.equal(true);
            });

            it('Should return false for a field without errors', () => {
                expect(testObject.result.hasErrors('example_2')).to.equal(false);
            });
        });

        describe('Field not specified', () => {
            it('Should return true if errors exist', () => {
                expect(testObject.result.hasErrors()).to.equal(true);
            });
        });

        describe('Specified field does not exist', () => {
            it('Should return false', () => {
                expect(testObject.result.hasErrors('nonexistent')).to.equal(false);
            });
        });
    });

    describe('method: hasWarnings', () => {
        let testObject;
        beforeEach(() => {
            testObject = new ResultObject('FormName');
            testObject.methods.initFieldCounters('example');
            testObject.methods.initFieldCounters('example_2');
            testObject.methods.fail('example', 'Error string', WARN);
        });

        describe('Field specified', () => {
            it('Should return true for a field with errors', () => {
                expect(testObject.result.hasWarnings('example')).to.equal(true);
            });

            it('Should return false for a field without errors', () => {
                expect(testObject.result.hasWarnings('example_2')).to.equal(false);
            });
        });

        describe('Field not specified', () => {
            it('Should return true if errors exist', () => {
                expect(testObject.result.hasWarnings()).to.equal(true);
            });
        });

        describe('Specified field does not exist', () => {
            it('Should return false', () => {
                expect(testObject.result.hasWarnings('nonexistent')).to.equal(false);
            });
        });
    });

    describe('method: fail', () => {

        let testObject;

        beforeEach(() => {
            testObject = new ResultObject('FormName');
            testObject.methods.initFieldCounters('f1');
        });

        it('Should return correct failing object', () => {
            testObject.methods.fail('f1', 'should fail', FAIL);

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
                validationErrors: { f1: ['should fail'] },
                validationWarnings: {},
                skipped: []
            });
        });

        it('Should return correct warning object', () => {
            testObject.metohs.fail('f1', 'should warn', WARN);
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

        it('Should return and keep object unchanged if field does not exist', () => {
            const testObject = new ResultObject('FormName');
            testObject.methods.fail('f1', 'I do not exist');

            expect(testObject).to.deep.equal(new ResultObject('FormName'));
        });
    });

    describe('methods: bumpTestWarning and bumpTestError', () => {

        let testObject;

        beforeEach(() => {
            testObject = new ResultObject('FormName');
            testObject.methods.initFieldCounters('f1');
        });

        it('#bumpTestWarning Should correctly update instance with field\'s warnings', () => {
            testObject.methods.bumpTestWarning('f1', 'should warn');

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
            testObject.methods.bumpTestError('f1', 'should error');

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