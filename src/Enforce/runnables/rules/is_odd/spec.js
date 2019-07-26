import faker from 'faker';
import { expect } from 'chai';
import isOdd from './index';

describe('Tests isOdd rule', () => {

    describe('When value is an odd number', () => {
        let oddNumbers = [];

        before(() => {
            let counter = 1;
            while(oddNumbers.length < 100) {
                oddNumbers.push(counter);
                counter+=2;
            }
        });

        it('Should return true', () => {
            oddNumbers.forEach((num) => {
                expect(isOdd(1)).to.equal(true);
            });
        });

        describe('When value is a numeric string', () => {

            it('Should return true', () => {
                oddNumbers.forEach((num) => {
                    expect(isOdd(num.toString())).to.equal(true);
                });
            });
        });

        describe('When value is negative', () => {
            it('Should return true', () => {
                oddNumbers.forEach((num) => {
                    expect(isOdd(-num)).to.equal(true);
                });
            });
        });
    });

    describe('When value is an even number', () => {
        let evenNumbers = [];

        before(() => {
            let counter = 0;
            while(evenNumbers.length < 100) {
                evenNumbers.push(counter);
                counter+=2;
            }
        });

        it('Should return false', () => {
            evenNumbers.forEach((num) => {
                expect(isOdd(num)).to.equal(false);
                expect(isOdd(-num)).to.equal(false);
                expect(isOdd(num.toString())).to.equal(false);
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
                'withNumber1',
                '1hasNumber',
            ].forEach((value) => {
                expect(isOdd(value)).to.equal(false);
            });
        });
    });
});
