import { testRunner, testRunnerAsync } from './index';
import { expect } from 'chai';
import { noop } from 'lodash';

describe('module: testRunner', () => {

    describe('function: testRunner', () => {
        const passing = () => true,
            failing = () => false,
            throwing = () => { throw Error(); };

        describe('Test passed implicitly (no-throw)', () => {
            it('Should default to true', () => {
                expect(testRunner(noop)).to.equal(true);
            });
        });

        describe('Test passed explicitly', () => {
            it('Should return true', () => {
                expect(testRunner(passing)).to.equal(true);
            });
        });

        describe('Test failed explicitly (return false)', () => {
            it('Should return false', () => {
                expect(testRunner(failing)).to.equal(false);
            });
        });

        describe('Test thrown', () => {
            it('Should return false', () => {
                expect(testRunner(throwing)).to.equal(false);
            });
        });

        describe('Unexpected callback input', () => {
            describe('Callback not supplied', () => {
                it('Should return false', () => {
                    expect(testRunner()).to.equal(false);
                });
            });

            describe('callback is not a function', () => {
                it('Should return false', () => {
                    [0, 1, true, false, [], {}, [55], null].forEach(() => {
                        expect(testRunner({})).to.equal(false);
                    });
                });
            });
        });
    });

    describe('function: testRunnerAsync', () => {

        describe('Test thrown', () => {

            it('Should call `fail`', (finish) => {
                const test = () => { throw Error(); };
                testRunnerAsync(test, noop, finish);
            });
        });

        describe('Test passed (resolved)', () => {
            it('Should call `done` without calling `fail`', (finish) => {
                let callCounter = 0;
                const fail = () => ++callCounter;
                const done = () => {
                    ++callCounter;
                    setTimeout(() => {
                        expect(callCounter).to.equal(1);
                        finish();
                    });
                };
                testRunnerAsync(new Promise((resolve, reject) => setTimeout(resolve)), done, fail);
            });
        });

        describe('Test failed (rejected)', () => {
            it('Should call `fail`', (finish) => {
                const fail = finish;
                testRunnerAsync(new Promise((resolve, reject) => setTimeout(reject)), noop, fail);
            });
        });
    });
});