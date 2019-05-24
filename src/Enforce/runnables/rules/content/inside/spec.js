import { expect } from 'chai';
import inside from './index';

describe('Inside rule', () => {
    it('Should correctly find a string inside an array', () => {
        expect(inside('I\'m', ['I\'m', 'gonna', 'pop', 'some', 'tags'])).to.equal(true);
        expect(inside('Eric', ['Eric', 'Kenny', 'Kyle', 'Stan'])).to.equal(true);
        expect(inside('myString', [1, [55], 'myString'])).to.equal(true);
    });

    it('Should fail to find a string inside an array in which it does not exist', () => {
        expect(inside('going to', ['I\'m', 'gonna', 'pop', 'some', 'tags'])).to.equal(false);
    });

    it('Should correctly find a number inside an array', () => {
        expect(inside(1, [1, 2, 3])).to.equal(true);
        expect(inside(42, [43, 44, 45, 46, 42])).to.equal(true);
        expect(inside(0, [1, [55], 0])).to.equal(true);
    });

    it('Should fail to find a number inside an array in which it does not exist', () => {
        expect(inside(55, [1, 2, 3])).to.equal(false);
    });

    it('Should correctly find a boolean inside an array', () => {
        expect(inside(true, [true, false, true, false])).to.equal(true);
        expect(inside(false, ['true', false])).to.equal(true);
    });

    it('Should fail to find a boolean inside an array in which it does not exist', () => {
        expect(inside(true, ['true', false])).to.equal(false);
        expect(inside(false, [true, 'one', 'two'])).to.equal(false);
    });

    it('Should correctly find all array elemets in another array', () => {
        expect(inside(['I\'m', 'pop'], ['I\'m', 'gonna', 'pop', 'some', 'tags'])).to.equal(true);
        expect(inside(['Eric'], ['Eric', 'Kenny', 'Kyle', 'Stan'])).to.equal(true);
        expect(inside(['myString', 1], [1, [55], 'myString'])).to.equal(true);
        expect(inside([1, 2, 3], [1, 2, 5, 6, 3])).to.equal(true);
    });

    it('Should fail to find array elemets in another array in which they do not exist', () => {
        expect(inside(['no', 'treble'], ['all', 'about', 'the', 'bass'])).to.equal(false);
    });

    it('Should fail to find object keys in an array in which they do not exist', () => {
        expect(inside(['one', 'two'], ['three', 'four'])).to.equal(false);
    });

    it('Should correctly find a string inside another string', () => {
        expect(inside('pop', 'I\'m gonna pop some tags')).to.equal(true);
        expect(inside('Kenny', 'You Killed Kenny!')).to.equal(true);
    });

    it('Should failt to find a string inside another string in which it does not exist', () => {
        expect(inside('mugs', 'I\'m gonna pop some tags')).to.equal(false);
    });

    it('Should expose negativeForm property', () => {
        expect(inside.negativeForm).to.equal('notInside');
    });
});