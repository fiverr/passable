'use strict'

import Passable from '../src/Passable.js';
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

const noSnuffles = Passable('ExtendTests', (pass, enforce) => {

        pass('NoSnuffles', 'should pass', () => {
            return enforce('The name is Rick', {
                has_no_snuffles: {
                    expect: true
                }
            });
        });

        pass('NoSnuffles', 'should Fail', () => {
            return enforce('The name is snuffles', {
                has_no_snuffles: {
                    expect: true
                },
                longerThan: {
                    testAgainst: 0
                }
            });
        });

        pass('regularTest', 'should pass', () => {
            return enforce('The name is snuffles', {
                longerThan: {
                    expect: false,
                    testAgainst: 42
                }
            });
        });
    }, {
        has_no_snuffles: (v) => v.indexOf('snuffles') === -1
    });
