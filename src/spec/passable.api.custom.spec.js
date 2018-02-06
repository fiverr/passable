'use strict';

import passable, { Enforce } from '../index.js';
import { expect } from 'chai';

describe('Test rule extensions', () => {
    it('Should perform three tests', () => {
        expect(noSnuffles.testCount).to.equal(3);
    });

    it('Should fail one test', () => {
        expect(noSnuffles.failCount).to.equal(1);
    });
});

const noSnuffles = passable('ExtendTests', null, (test) => {

    const enforce = new Enforce({
        no_slave_name: (v) => v.indexOf('Snuffles') === -1
    });

    test('NoSnuffles', 'should pass', () => (

        enforce('The name is Snowball').allOf({
            no_slave_name: {}
        })
    ));

    test('NoSnuffles', 'should Fail', () => {

        enforce('The name is Snuffles').allOf({
            no_slave_name: {},
            largerThan: 5
        }, 'here');
    });

    test('regularTest', 'should pass', () => enforce(55).allOf({
        largerThan: 42
    }));

});
