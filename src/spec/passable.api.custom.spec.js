'use strict';

import passable from '../Passable';
import chai from 'chai';

const expect = chai.expect;

describe('Test rule extensions', () => {
    it('Should perform three tests', () => {
        expect(noSnuffles.testCount).to.equal(3);
    });

    it('Should fail one test', () => {
        expect(noSnuffles.failCount).to.equal(1);
    });
});

const noSnuffles = passable('ExtendTests', (pass, enforce) => {
    pass('NoSnuffles', 'should pass', () => (

        enforce('The name is Snowball').allOf({
            no_slave_name: {}
        }).fin()
    ));

    pass('NoSnuffles', 'should Fail', () => {

        enforce('The name is Snuffles').allOf({
            no_slave_name: {},
            largerThan: 5
        }, 'here').fin();
    });

    pass('regularTest', 'should pass', () => enforce(55).allOf({
        largerThan: 42
    }).fin());

}, {
    no_slave_name: (v) => v.indexOf('Snuffles') === -1
});
