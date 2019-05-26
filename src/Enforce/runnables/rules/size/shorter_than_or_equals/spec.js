import { expect } from 'chai';
import faker from 'faker';
import shorterThanOrEquals from './index';

describe('Tests shorterThanOrEquals rule', () => {

    const length = faker.random.number();
    const word = faker.random.word();
    const boolean = faker.random.boolean();

    describe('First argument is array or string', () => {

        describe('When first argument is shorter', () => {

            it('Should return true for an array shorter than length', () => {
                expect(shorterThanOrEquals(new Array(length), length + 1)).to.equal(true);
            });

            it('Should return true for a string shorter than word length', () => {
                expect(shorterThanOrEquals(word, word.length + 1)).to.equal(true);
            });
        });

        describe('When first argument is equal to a given value', () => {

            it('Should return true for an array equal to length', () => {
                expect(shorterThanOrEquals(new Array(length), length)).to.equal(true);
            });

            it('Should return true for a string equal to word length', () => {
                expect(shorterThanOrEquals(word, word.length)).to.equal(true);
            });
        });

        describe('When first argument is longer', () => {

            it('Should return false for an array longer than length', () => {
                expect(shorterThanOrEquals(new Array(length), length - 1)).to.equal(false);
            });

            it('Should return false for a string longer than length', () => {
                expect(shorterThanOrEquals(word, word.length - 1)).to.equal(false);
            });
        });
    });

    describe('First argument isn\'t array or string', () => {

        it('Should throw error', () => {
            expect(() => shorterThanOrEquals(undefined, 0)).to.throw(TypeError);
        });

        it('Should return false for number argument', () => {
            expect(shorterThanOrEquals(length, 0)).to.equal(false);
        });

        it('Should return false for boolean argument', () => {
            expect(shorterThanOrEquals(boolean, 0)).to.equal(false);
        });
    });
});