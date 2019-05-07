import Passable from '.';
import { expect } from 'chai';
import { WARN, FAIL } from '../../index';
import { noop, random, sample, clone } from 'lodash';
import { lorem } from 'faker';
import sinon from 'sinon';

describe("Tests Passable's `test` functionality", () => {

    describe('method: test', () => {
        describe('Supplied test callback is a function', () => {
            let instance;
            const allTests = [];

            beforeEach(() => {
                instance = new Passable('formname', noop);
                allTests.length = 0;

                for (let i = 0; i < random(1, 15); i++) {
                    allTests.push(() => null);
                }
            });

            it('Should never call `addPendingTest` for sync tests', () => {
                let callCounter = 0;
                instance.addPendingTest = () => ++callCounter;
                allTests.forEach((test) => instance.test(lorem.word(), lorem.sentence(), test));
                expect(callCounter).to.equal(0);
            });

            it('Should assign `fieldName`, `statement` and `severity` to test callback', () => {
                const severities = [WARN, FAIL];
                const savedValues = [];

                allTests.forEach((test, i) => {
                    const fieldName = lorem.word();
                    const statement = lorem.sentence();
                    const severity = sample(severities);
                    savedValues[i] = { fieldName, statement, severity };
                    instance.test(fieldName, statement, test, severity);

                });

                allTests.forEach((test, i) => {
                    expect(test.fieldName).to.equal(savedValues[i].fieldName);
                    expect(test.statement).to.equal(savedValues[i].statement);
                    expect(test.severity).to.equal(savedValues[i].severity);
                });
            });
        });

        describe('Supplied test callback is a promise', () => {
            let instance;
            const allTests = [];

            beforeEach(() => {
                instance = new Passable('formname', noop);
                allTests.length = 0;

                for (let i = 0; i < random(1, 15); i++) {
                    allTests.push(Promise.resolve());
                }
            });

            it('Should never call `addPendingTest` for async tests', () => {
                let callCounter = 0;
                instance.addPendingTest = () => ++callCounter;
                allTests.forEach((test) => instance.test(lorem.word(), lorem.sentence(), test));
                expect(callCounter).to.equal(allTests.length);
            });

            it('Should assign `fieldName`, `statement` and `severity` to test callback', () => {
                const severities = [WARN, FAIL];
                const savedValues = [];

                allTests.forEach((test, i) => {
                    const fieldName = lorem.word();
                    const statement = lorem.sentence();
                    const severity = sample(severities);
                    savedValues[i] = { fieldName, statement, severity };
                    instance.test(fieldName, statement, test, severity);

                });

                allTests.forEach((test, i) => {
                    expect(test.fieldName).to.equal(savedValues[i].fieldName);
                    expect(test.statement).to.equal(savedValues[i].statement);
                    expect(test.severity).to.equal(savedValues[i].severity);
                });
            });
        });

        describe('Supplied test callback is not supported', () => {
            let instance;

            beforeEach(() => {
                instance = new Passable('formname', noop);
            });


            [0, 1, [], [55], {}, false, true, null, undefined].forEach((testCb) => {
                it(`Should return without calling 'addPendingTest' for ${testCb}`, () => {
                    let callCounter = 0;
                    instance.addPendingTest = () => ++callCounter;
                    instance.test(lorem.word(), lorem.sentence(), testCb);
                    expect(callCounter).to.equal(0);
                });
            });
        });
    });

    describe('method: runPendingTests', () => {
        let instance, allTests;

        beforeEach(() => {
            allTests = [];
            for (let i = 0; i < random(1, 15); i++) {
                allTests.push(sinon.spy());
            }
            instance = new Passable('formname', (test) => allTests.forEach((t) => {
                test(lorem.word(), lorem.sentence(), t);
            }));
        });

        it('Should call all test callbacks', () => {
            allTests.forEach((test) => {
                expect(test.calledOnce).to.equal(true);
            });
        });

        it('Should clear pending tests list', () => {
            expect(instance.pending).to.be.empty;
        });

        it('Should call bumpTestCounter for each of the tests', () => {
            const count = random(1, 15);
            const spy = sinon.spy();

            for (let i = 0; i < count; i++) {
                const test = sinon.spy();
                test.fieldName = lorem.word();
                test.statement = lorem.sentence();
                instance.pending.push(test);
            }
            instance.res.bumpTestCounter = spy;
            instance.runPendingTests();
            expect(spy.callCount).to.equal(count);
        });

        describe('async test behavior', () => {
            describe('failing', () => {
                let f1, f2;
                beforeEach(() => {
                    f1 = lorem.word();
                    f2 = lorem.word();

                    instance = new Passable('formname', (test) => {
                        test(f1, lorem.sentence(), new Promise((resolve, reject) => setImmediate(reject)));
                        test(f2, lorem.sentence(), new Promise((resolve) => setTimeout(resolve)));
                        test(f2, lorem.sentence(), new Promise((resolve) => setTimeout(resolve, 500)));
                        test(lorem.word(), lorem.sentence(), noop);
                    });
                });

                it('Should immediately register tests', () => {
                    expect(instance.res.testCount).to.equal(4);
                });

                it('Should set field as async (done: false) upon init', () => {
                    expect(instance.res.async).to.deep.equal({
                        [f1]: { done: false },
                        [f2]: { done: false }
                    });
                });

                describe('Single test for a given field name (f1)', () => {                    
                    it('Should set async field as done when completed', (done) => {
                        setTimeout(() => {
                            expect(instance.res.async[f1]).to.deep.equal({ done: true });
                            done();
                        }, 10);
                    });
                });

                describe('Multiple tests for a given field name (f2)', () => {
                    it('Should continue and not call done if not all tests finished running', (done) => {
                        setTimeout(() => {
                            expect(instance.res.async[f2]).to.deep.equal({ done: false });
                            done();
                        }, 10);
                    });

                    it('Should Call done after all tests finished running', (done) => {
                        setTimeout(() => {
                            expect(instance.res.async[f2]).to.deep.equal({ done: true });
                            done();
                        }, 600);
                    });
                });

                it('Should only marke test as failing after rejection', (done) => {
                    expect(instance.res.failCount).to.equal(0);
                    setTimeout(() => {
                        expect(instance.res.failCount).to.equal(1);
                        done();
                    }, 10);
                });
            });

            describe('passing', () => {
                beforeEach(() => {
                    instance = new Passable('formname', (test) => {
                        test(lorem.word(), lorem.sentence(), new Promise((resolve, reject) => setImmediate(resolve)));
                    });
                });

                it('Should keep test unchanged after resolution', (done) => {
                    const res = clone(instance.res);
                    setTimeout(() => {
                        expect(instance.res).to.deep.equal(res);
                        done();
                    }, 10);
                });
            });
        });

        describe('sync test behavior', () => {
            it('should mark a test as failed for a thrown error', () => {
                const name = lorem.word();
                instance = new Passable(lorem.word(), (test) => {
                    test(name, lorem.sentence(), () => { throw new Error(); });
                    test(lorem.word(), lorem.sentence(), noop);
                });
                expect(instance.res.failCount).to.equal(1);
                expect(instance.res.validationErrors).to.have.key(name);
            });

            it('Should keep responseObject:async as untouched', () => {
                const name = lorem.word();
                instance = new Passable(lorem.word(), (test) => {
                    test(name, lorem.sentence(), () => { throw new Error(); });
                    test(lorem.word(), lorem.sentence(), noop);
                });
                expect(instance.res.async).to.equal(null);
            });

            it('should mark a test as failed for `false`', () => {
                const name = lorem.word();
                instance = new Passable(lorem.word(), (test) => {
                    test(name, lorem.sentence(), () => false);
                    test(lorem.word(), lorem.sentence(), noop);
                });
                expect(instance.res.failCount).to.equal(1);
                expect(instance.res.validationErrors).to.have.key(name);
            });

            it('should implicitly pass test', () => {
                const name = lorem.word();
                instance = new Passable(lorem.word(), (test) => {
                    test(name, lorem.sentence(), noop);
                });
                expect(instance.res.failCount).to.equal(0);
                expect(instance.res.testCount).to.equal(1);
            });
        });
    });
});