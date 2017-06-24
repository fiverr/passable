'use strict';

import passable from '../Passable.js';
import chai from 'chai';

const expect = chai.expect;

describe('Test test extensions', () => {
    it('Should perform three tests', () => {
        expect(noSnuffles.testCount).to.equal(3);
    });

    it('Should fail one test', () => {
        expect(noSnuffles.failCount).to.equal(1);
    });
});

const noSnuffles = passable('ExtendTests', (pass, enforce) => {

    pass('NoSnuffles', 'should pass', () => enforce('The name is Rick').allOf({
        has_no_snuffles: {}
    }).fin());

    pass('NoSnuffles', 'should Fail', () => enforce('The name is snuffles').allOf({
        has_no_snuffles: {},
        largerThan: 5
    }).fin());

    pass('regularTest', 'should pass', () => enforce(55).allOf({
        largerThan: 42
    }).fin());

}, {
    has_no_snuffles: (v) => v.indexOf('snuffles') === -1
});
