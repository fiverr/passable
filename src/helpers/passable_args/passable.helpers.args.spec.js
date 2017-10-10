'use strict';

import passableArgs from './index';
import chai from 'chai';

const expect = chai.expect;

describe('Test Passable arguments logic', () => {
    const noop = () => undefined;

    it('Should throw exception when given no arguments', () => {
        expect(passableArgs.bind(null, [])).to.throw("passable]: Failed to execute 'passableArgs': At least 1 argument required, but only 0 present.");
    });

    it('Should throw exception when given only string argument', () => {
        expect(passableArgs.bind(null, ['basic'])).to.throw("[passable]: Failed to execute 'passableArgs': Unexpected string, expected function");
    });

    it('Should return given "passes", default on specific and custom', () => {
        const value = passableArgs([noop]);
        expect(value).to.deep.equal({
            passes: noop,
            custom: {},
            specific: []
        });
    });

    it('Should return all attrs, not use default values', () => {
        const yet = noop;
        const value = passableArgs(['funny', yet, 'not']);
        expect(value).to.deep.equal({
            specific: 'funny',
            passes: yet,
            custom: 'not'
        });
    });

    it('Should return specific and passes, default on custom', () => {
        const value = passableArgs([['Yo'], noop]);
        expect(value).to.deep.equal({
            specific: ['Yo'],
            passes: noop,
            custom: {}
        });
    });

    it('Should return custom and passes, default on specific', () => {
        const value = passableArgs(['First', 'Second']);
        expect(value).to.deep.equal({
            specific: [],
            passes: 'First',
            custom: 'Second'
        });
    });
});
