import any from '.';
import { enforce } from '../../.';
import { expect } from 'chai';
import sinon from 'sinon';

describe('Utilities: any', () => {
    let fn1, fn2, fn3, fn4;

    describe('calling functions in sequence', () => {
        let calls;
        beforeEach(() => {
            calls = [];
            fn1 = () => calls.push(1);
            fn2 = () => calls.push(2);
            fn3 = () => calls.push(3);
            fn4 = () => calls.push(4);
        });

        it('Should call all functions in the right order', () => {
            expect(calls).to.deep.equal([]);

            any(fn1, fn2, fn3, fn4);

            // this ensures that the functions
            // indeed got called in the right order order
            expect([...calls]).to.deep.equal(calls.sort());
        });
    });

    describe('Return value', () => {

        describe('All functions fail', () => {

            describe('Error thrown', () => {
                beforeEach(() => {
                    fn1 = sinon.spy(() => enforce(1).equals(2));
                });

                it('Should return false', () => {
                    expect(any(fn1)()).to.equal(false);
                });
            });

            describe('Explicitly false', () => {
                beforeEach(() => {
                    fn1 = sinon.spy(() => 1 > 2);
                    fn2 = sinon.spy(() => false);
                });

                it('Should return false', () => {
                    expect(any(
                        fn1,
                        fn2
                    )()).to.equal(false);
                });
            });
        });

        describe('All functions pass', () => {
            beforeEach(() => {
                fn1 = sinon.spy(() => enforce(1).equals(1));
                fn2 = sinon.spy(() => true);
            });

            it('Should return true', () => {
                expect(any(
                    fn1,
                    fn2
                )()).to.equal(true);
            });
        });
    });

    describe('Short circuiting', () => {
        beforeEach(() => {
            fn1 = sinon.spy(() => enforce(1).equals(2));
            fn2 = sinon.spy(() => enforce('hello').matches(/[0-9]/));
            fn3 = sinon.spy(() => enforce(1).equals(1));
            fn4 = sinon.spy(() => enforce(1).isString());
        });

        it('Should short circuit on first success', () => {
            expect(fn1.callCount).to.equal(0);
            expect(fn2.callCount).to.equal(0);
            expect(fn3.callCount).to.equal(0);
            expect(fn4.callCount).to.equal(0);

            any(fn1, fn2, fn3, fn4)();

            expect(fn1.callCount).to.equal(1);
            expect(fn2.callCount).to.equal(1);
            expect(fn3.callCount).to.equal(1);
            expect(fn4.callCount).to.equal(0);
        });
    });
});