'use strict'

import PassableArgs from './index';
import chai from 'chai';

const expect = chai.expect;

describe('Test Passable arguments logic', () => {

    it('Should return given "passes", default on specific and custom', () => {
        const value = PassableArgs(['basic']);
        expect(value).to.deep.equal({
            passes: 'basic',
            custom: {},
            specific: []
        });
    });

    it('Should return all attrs, not use default values', () => {
        const value = PassableArgs(['funny', 'yet', 'not']);
        expect(value).to.deep.equal({
            specific: 'funny',
            passes: 'yet',
            custom: 'not',
        });
    });

    it('Should return specific and passes, default on custom', () => {
        const stamFunction = () => {},
            value = PassableArgs([['Yo'], stamFunction]);
        expect(value).to.deep.equal({
            specific: ['Yo'],
            passes: stamFunction,
            custom: {},
        });
    });

    it('Should return custom and passes, default on specific', () => {
        const value = PassableArgs(['First', 'Second']);
        expect(value).to.deep.equal({
            specific: [],
            passes: 'First',
            custom: 'Second',
        });
    });
});
