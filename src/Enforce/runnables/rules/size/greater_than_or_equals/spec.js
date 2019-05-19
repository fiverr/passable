import { expect } from 'chai';
import { random } from 'faker';
import greaterThanOrEquals from './index';

describe('Tests greaterThanOrEquals rule', () => {
    let arg0, arg1;

    describe('Arguments are numbers', () => {
        beforeEach(() => {
            arg0 = random.number();
        });

        describe('When first argument is larger', () => {

            it('Should return true', () => {
                expect(greaterThanOrEquals(arg0, arg0 - 1)).to.equal(true);
            });
        });

        describe('When first argument is smaller', () => {

            it('Should return true', () => {
                expect(greaterThanOrEquals(arg0, arg0 + 1)).to.equal(false);
            });
        });

        describe('When values are equal', () => {
            it('Should return true', () => {
                expect(greaterThanOrEquals(arg0, arg0)).to.equal(true);
            });
        });
    });

    describe('Arguments are numeric strings', () => {
        describe('When first argument is larger', () => {
            it('Should return true', () => {
                expect(greaterThanOrEquals(`${arg0}`, `${arg0 - 1}`)).to.equal(true);
            });
        });

        describe('When first argument is smaller', () => {
            it('Should return true', () => {
                expect(greaterThanOrEquals(`${arg0}`, `${arg0 + 1}`)).to.equal(false);
            });
        });

        describe('When values are equal', () => {
            it('Should return true', () => {
                expect(greaterThanOrEquals(arg0, arg0)).to.equal(true);
            });
        });
    });

    describe('Arguments are non numeric', () => {
        [random.word(), (`${random.number()}`).split(''), {}].forEach((element) => {
            it('Should return false', () => {
                expect(greaterThanOrEquals(element, 0)).to.equal(false);
            });
        });
    });
});