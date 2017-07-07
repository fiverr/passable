'use strict';

import chai from 'chai';
import inside from './index';

const expect = chai.expect;

describe('Inside rule', () => {
    it('Should correctly find a string inside an array', () => {
        expect(inside('I\'m', ['I\'m', 'gonna', 'pop', 'some', 'tags'])).to.equal(true);
        expect(inside('Eric', ['Eric', 'Kenny', 'Kyle', 'Stan'])).to.equal(true);
        expect(inside('myString', [1, {}, [55], 'myString'])).to.equal(true);
    });

    it('Should fail to find a string inside an array in which it does not exist', () => {
        expect(inside('going to', ['I\'m', 'gonna', 'pop', 'some', 'tags'])).to.equal(false);
    });

    it('Should correctly find a number inside an array', () => {
        expect(inside(1, [1, 2, 3])).to.equal(true);
        expect(inside(42, [43, 44, 45, 46, 42])).to.equal(true);
        expect(inside(0, [1, {}, [55], 0])).to.equal(true);
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
        expect(inside(['myString', 1], [1, {}, [55], 'myString'])).to.equal(true);
        expect(inside([1, 2, 3], [1, 2, 5, 6, 3])).to.equal(true);
    });

    it('Should fail to find array elemets in another array in which they do not exist', () => {
        expect(inside(['no', 'treble'], ['all', 'about', 'the', 'bass'])).to.equal(false);
    });

    it('Should correctly find all object keys in an array', () => {
        expect(inside({one: 1, two: 2}, ['one', 'two', 'three', 'four'])).to.equal(true);
        expect(inside({'Eric': 'Cartmen'}, ['Eric', 'Kenny', 'Kyle', 'Stan'])).to.equal(true);
        expect(inside({'Eric': 'Cartmen'}, ['Eric', [], 55, {}])).to.equal(true);
    });

    it('Should fail to find object keys in an array in which they do not exist', () => {
        expect(inside({one: 1, two: 2}, ['three', 'four'])).to.equal(false);
    });

    it('Should correctly find a string as an object key', () => {
        expect(inside('pop', {Im: 1, gonna: 2, pop: 3, some: 4, tags: 5})).to.equal(true);
        expect(inside('pop', {pop: 1})).to.equal(true);
    });

    it('Should fail to find a string in an object in which it is not a key', () => {
        expect(inside('rags', {Im: 1, gonna: 2, pop: 3, some: 4, tags: 5})).to.equal(false);
    });

    it('Should correctly find a number as an object key', () => {
        expect(inside(1, {1:1, 2:2, 3:3})).to.equal(true);
        expect(inside(2, {2:1})).to.equal(true);
    });

    it('Should fail to find a number in an object in which it is not a key', () => {
        expect(inside(41, {1:1, 2:2, 3:3})).to.equal(false);
    });

    it('Should correctly find all array elemets as object keys', () => {
        expect(inside([1, 'a', 3], {1:1, a:2, 3:3})).to.equal(true);
        expect(inside(['a', 'b', 'c'], {'a':1, 'b':2, 'c':3})).to.equal(true);
    });

    it('Should fail to find array elemets as object keys in which they do not exist', () => {
        expect(inside([1, 'a', 3], {2:1, b:2, 4:3})).to.equal(false);
        expect(inside(['d', 'e', 'f'], {'a':1, 'b':2, 'c':3})).to.equal(false);
    });

    it('Should correctly find object kyes in another object keys', () => {
        expect(inside({1: 1, a: 2, c:3}, {1:1, a:2, c:3})).to.equal(true);
        expect(inside({a:1, b:2, c:3}, {'a':1, 'b':2, 'c':3})).to.equal(true);
    });

    it('Should fail to find object kyes in another object keys in which they do not exist', () => {
        expect(inside({4: 1, b: 2, j: 3}, {1:1, a:2, c:3})).to.equal(false);
    });

    it('Should correctly find a string inside another string', () => {
        expect(inside('pop', 'I\'m gonna pop some tags')).to.equal(true);
        expect(inside('Kenny', 'You Killed Kenny!')).to.equal(true);
    });

    it('Should failt to find a string inside another string in which it does not exist', () => {
        expect(inside('mugs', 'I\'m gonna pop some tags')).to.equal(false);
    });
});