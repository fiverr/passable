import passable from '../passable';
import test from '.';
import { expect } from 'chai';
import { FAIL, WARN } from '../../index';
import { clone, noop, random } from 'lodash';
import { lorem } from 'faker';
import sinon from 'sinon';

describe('Test Passables "test" function', () => {
    let output;

    describe('Supplied test callback is a function', () => {
        const allTests = [];

        beforeEach(() => {
            passable(lorem.word(), noop);
            allTests.length = 0;

            for (let i = 0; i < random(1, 15); i++) {
                allTests.push(() => null);
            }
        });
    });

    describe('Supplied test callback is a promise', () => {
        const allTests = [];

        beforeEach(() => {
            passable(lorem.word(), noop);
            allTests.length = 0;

            for (let i = 0; i < random(1, 15); i++) {
                allTests.push(Promise.resolve());
            }
        });
    });

    describe('Supplied test callback is not supported', () => {

        beforeEach(() => {
            passable(lorem.word(), noop);
        });


        [0, 1, [], [55], {}, false, true, null, undefined].forEach((testCb) => {
            it(`Should return without adding pending test for ${testCb}`, () => {
                output = passable(lorem.word(), () => {
                    test(lorem.word(), lorem.sentence(), testCb);
                });
                expect(output.testCount).to.equal(0);
            });
        });
    });

    describe('Running test callback', () => {
        let allTests;

        beforeEach(() => {
            allTests = [];
            for (let i = 0; i < random(1, 15); i++) {
                allTests.push(sinon.spy());
            }
            passable(lorem.word(), () => allTests.forEach((t) => {
                test(lorem.word(), lorem.sentence(), t);
            }));
        });

        it('Should call all test callbacks', () => {
            allTests.forEach((fn) => {
                expect(fn.calledOnce).to.equal(true);
            });
        });

        it('Should bump test counters for each of the tests', () => {
            const count = random(1, 15);

            output = passable(lorem.word(), () => {
                for (let i = 0; i < count; i++) {
                    test(lorem.word(), lorem.sentence(), noop);
                }
            });

            expect(output.testCount).to.equal(count);
        });

        describe('Test is async', () => {

            describe('When returning promise to test callback', () => {
                let f1, f2, f3, f4, f5, f6, output;
                const rejectionMessage = lorem.sentence();

                beforeEach(() => {
                    f1 = lorem.word();
                    f2 = lorem.word();
                    f3 = lorem.word();
                    f4 = lorem.word();
                    f5 = lorem.word();
                    f6 = lorem.word();

                    const rejectLater = () => new Promise((res, rej) => {
                        setTimeout(rej, 500);
                    });

                    output = passable(lorem.word(), (test) => {
                        test(f1, f1, () => Promise.reject());
                        test(f2, f2, () => new Promise((resolve, reject) => {
                            setTimeout(reject, 200);
                        }));
                        test(f3, () => Promise.reject(lorem.word()));
                        test(f3, () => Promise.reject(rejectionMessage));
                        test(f4, f4, () => Promise.reject(rejectionMessage));
                        test(f5, f5, () => new Promise((resolve) => {
                            setTimeout(resolve, 100);
                        }));
                        test(f6, f6, async() => await rejectLater());
                    });
                });

                it('Should fail for rejected promise', (done) => {
                    [f1, f2, f3, f4, f6].forEach((field) =>
                        expect(output.hasErrors(field)).to.equal(false)
                    );

                    setTimeout(() => {
                        [f1, f2, f3, f4, f6].forEach((field) =>
                            expect(output.hasErrors(field)).to.equal(true)
                        );

                        [f1, f2, f6].forEach((field) =>
                            expect(output.getErrors(field)).to.include(field)
                        );

                        done();
                    }, 550);
                });

                it('Should fail with rejection message when provided', (done) => {
                    setTimeout(() => {
                        [f3, f4].forEach((field) => {
                            expect(output.getErrors(field)).to.include(rejectionMessage);
                        });

                        done();
                    }, 550);
                });

                it('Should pass for fulfilled promises', (done) => {
                    expect(output.hasErrors(f5)).to.equal(false);

                    setTimeout(() => {
                        expect(output.hasErrors(f5)).to.equal(false);
                        done();
                    }, 500);
                });

            });

            describe('When passing a Promise as a test', () => {
                describe('failing', () => {
                    let f1, f2, f3, f4;
                    const rejectionMessage = lorem.sentence();

                    beforeEach(() => {
                        f1 = lorem.word();
                        f2 = lorem.word();
                        f3 = lorem.word();
                        f4 = lorem.word();

                        output = passable(lorem.word(), (test) => {
                            test(f1, f1, new Promise((_, reject) => setImmediate(reject)));
                            test(f2, new Promise((_, reject) => setImmediate(() => reject(rejectionMessage))));
                            test(f3, lorem.sentence(), new Promise((_, reject) => setImmediate(() => reject(lorem.word()))));
                            test(f3, f3, new Promise((_, reject) => setImmediate(() => reject(rejectionMessage))));
                            test(f4, f4, new Promise((resolve) => setTimeout(resolve)));
                            test(f4, f4, new Promise((resolve) => setTimeout(resolve, 500)));
                            test(lorem.word(), lorem.sentence(), noop);
                        });
                    });

                    it('Should immediately register tests', () => {
                        expect(output.testCount).to.equal(7);
                    });

                    it('Should run async test promise', (done) => {
                        passable(lorem.word(), (test) => {
                            test(f1, lorem.sentence(), new Promise(() => done()));
                            test(lorem.word(), lorem.sentence(), noop);
                        });
                    });

                    it('Should fail with rejection message when provided', (done) => {
                        setTimeout(() => {
                            [f2, f3].forEach((field) => {
                                expect(output.getErrors(field)).to.include(rejectionMessage);
                                expect(output.getErrors(field)).not.to.include(field);
                            });

                            done();
                        }, 550);
                    });

                    it('Should only mark test as failing after rejection', (done) => {
                        expect(output.failCount).to.equal(0);

                        setTimeout(() => {
                            expect(output.failCount).to.equal(4);
                            done();
                        }, 10);
                    });
                });

                describe('passing', () => {
                    beforeEach(() => {
                        output = passable(lorem.word(), (test) => {
                            test(lorem.word(), lorem.sentence(), new Promise((resolve, reject) => setImmediate(resolve)));
                        });
                    });

                    it('Should keep test unchanged after resolution', (done) => {
                        const res = clone(output);
                        setTimeout(() => {
                            expect(output).to.deep.equal(res);
                            done();
                        }, 10);
                    });
                });
            });
        });

        describe('sync test behavior', () => {
            it('should mark a test as failed for a thrown error', () => {
                const name = lorem.word();
                output = passable(lorem.word(), (test) => {
                    test(name, lorem.sentence(), () => { throw new Error(); });
                    test(lorem.word(), lorem.sentence(), noop);
                });
                expect(output.failCount).to.equal(1);
                expect(output.hasErrors(name)).to.equal(true);
            });

            it('should mark a test as failed for explicit `false`', () => {
                const name = lorem.word();
                output = passable(lorem.word(), (test) => {
                    test(name, lorem.sentence(), () => false);
                    test(lorem.word(), lorem.sentence(), noop);
                });
                expect(output.failCount).to.equal(1);
                expect(output.hasErrors(name)).to.equal(true);
            });

            it('should implicitly pass test', () => {
                const name = lorem.word();
                output = passable(lorem.word(), (test) => {
                    test(name, lorem.sentence(), noop);
                });
                expect(output.failCount).to.equal(0);
                expect(output.testCount).to.equal(1);
            });
        });
    });
});