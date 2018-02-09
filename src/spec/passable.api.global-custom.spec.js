'use strict';

import passable from '../index.js';
import { expect } from 'chai';
import { root } from 'Helpers';

root.customPassableRules = {
    alwaysTrue: () => true,
    alwaysFalse: () => false,
    largerEquals: (v, arg) => v >= arg
};

const globalCustom = passable('GlobalCustom', null, (test, enforce) => {
    test('alwaysTrue', 'Should always pass', () => {
        enforce(false).allOf({ alwaysTrue: null });
        enforce(true).allOf({ alwaysTrue: null });
        enforce(12).allOf({ alwaysTrue: null });
        enforce('mindblown').allOf({ alwaysTrue: null });
    });

    test('alwaysFalse', 'Should always fail', () => {
        enforce(true).allOf({ alwaysFalse: null });
        enforce(false).allOf({ alwaysFalse: null });
        enforce(12).allOf({ alwaysFalse: null });
        enforce('mindblown').allOf({ alwaysFalse: null });
    });

    test('largerEquals', 'Should pass', () => {
        enforce(1).allOf({ largerEquals: 1 });
        enforce(1).allOf({ largerEquals: 0 });
        enforce('ab').allOf({ largerEquals: 'ab' });
    });

    test('largerEquals', 'Should fail', () => {
        enforce(1).allOf({ largerEquals: 0 });
        enforce(1).allOf({ largerEquals: 2 });
        enforce('ab').allOf({ largerEquals: 'abo' });
    });

    test('Together', 'should play nicely with others', () => {
        enforce(5).allOf({
            largerEquals: 4,
            largerThan: 3,
            smallerThan: 6
        });

        enforce(5).anyOf({
            alwaysFalse: null,
            alwaysTrue: null
        });
    });
});

describe('Test global rule extensions', () => {
    it('Should run all 5 tests', () => {
        expect(globalCustom.testCount).to.equal(5);
    });

    it('Should fail twice', () => {
        expect(globalCustom.failCount).to.equal(2);
    });

    it('Should fail on the correct tests', () => {
        expect(globalCustom.validationErrors).to.deep.equal({
            alwaysFalse: ['Should always fail'],
            largerEquals: ['Should fail']
        });
    });
});