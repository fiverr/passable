'use strict';

import { expect } from 'chai';
import matches from './index';

const URL = /(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.(?=.*[a-z]){1,24}\b([-a-zA-Z0-9@:%_+.~#?&//=()]*)/,
    LENGTH = /^[a-zA-Z]{3,7}$/,
    NUMBERS = '[0-9]';

describe('Tests matches rule', () => {

    it('Should return true for a matching regex', () => {
        expect(matches('https://google.com', URL)).to.equal(true);
        expect(matches('github.com', URL)).to.equal(true);
        expect(matches('ealush', LENGTH)).to.equal(true);
    });

    it('Should return false for a non matching regex', () => {
        expect(matches('google', URL)).to.equal(false);
        expect(matches('Minimum1', LENGTH)).to.equal(false);
    });

    it('Should convert string to regex and return true', () => {
        expect(matches('9675309', NUMBERS)).to.equal(true);
        expect(matches('Minimum1', NUMBERS)).to.equal(true);
    });

    it('Should convert string to regex and return false', () => {
        expect(matches('no-match', NUMBERS)).to.equal(false);
        expect(matches('Minimum', NUMBERS)).to.equal(false);
    });

    it('Should return false if a valid RegExp nor a string were given', () => {
        expect(matches('no-match', {})).to.equal(false);
        expect(matches('no-match')).to.equal(false);
        expect(matches('no-match', null)).to.equal(false);
        expect(matches('no-match', 11)).to.equal(false);
    });
});