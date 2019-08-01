import faker from 'faker';
import { expect } from 'chai';
import isEven from './index';

describe('Tests isEven rule', () => {

    describe('When value is an even number', () => {
        let evenNumbers = [];

        before(() => {
            let counter = 0;
            while(evenNumbers.length < 100) {
                evenNumbers.push(counter);
                counter+=2;
            }
        });

        it('Should return true', () => {
            evenNumbers.forEach((num) => {
                expect(isEven(num)).to.equal(true);
            });
        });

        describe('When value is a numeric string', () => {

            it('Should return true', () => {
                evenNumbers.forEach((num) => {
                    expect(isEven(num.toString())).to.equal(true);
                });
            });
        });

        describe('When value is negative', () => {
            it('Should return true', () => {
                evenNumbers.forEach((num) => {
                    expect(isEven(-num)).to.equal(true);
                });
            });
        });
    });

    describe('When value is an odd number', () => {
        let oddNumbers = [];

        before(() => {
            let counter = 1;
            while(oddNumbers.length < 100) {
                oddNumbers.push(counter);
                counter+=2;
            }
        });

        it('Should return false', () => {
            oddNumbers.forEach((num) => {
                expect(isEven(num)).to.equal(false);
                expect(isEven(-num)).to.equal(false);
                expect(isEven(num.toString())).to.equal(false);
            });
        });
    });

    describe('When value is non numeric', () => {
        it('Should return false', () => {
            [
                faker.random.word(),
                new Array(),
                new Function(),
                new Object(),
                'withNumber2',
                '2hasNumber',
            ].forEach((value) => {
                expect(isEven(value)).to.equal(false);
            });
        });
    });
});
