'use strict'

import Enforce from './index';
import chai from 'chai';

const expect = chai.expect,
    enforce = Enforce();
const failOnImplicitTrue = enforce([1, 2, 3], {
    largerThan: {
        testAgainst: 22
    }
});

const faileOnExplicitTrue = enforce([1, 2, 3], {
    largerThan: {
        testAgainst: 4111,
        expect: true
    }
});

const passOnExplicitFlip = enforce([1, 2, 3], {
    largerThan: {
        testAgainst: 4,
        expect: false
    }
});

const failOnExplicitFlip = enforce([1, 2, 3], {
    smallerThan: {
        testAgainst: 4,
        expect: false
    }
});

const noOptionsFailExpectFalse = enforce([], {
    isArray: false
});

const noOptionsFailExpectNull = enforce([], {
    isArray: null
});

const noOptionsFailExpectZero = enforce([], {
    isArray: 0
});

const noOptionsFailExpectUndefined = enforce([], {
    isArray: undefined
});

const noOptionsFailExpectTrue = enforce(42, {
    isArray: true
});

const noOptionsFailExpectOne = enforce(42, {
    isArray: 1
});

const noOptionsPassExpectFalse = enforce(42, {
    isArray: false
});

const noOptionsPassExpectNull = enforce(66, {
    isArray: null
});

const noOptionsPassExpectZero = enforce({}, {
    isArray: 0
});

const noOptionsPassExpectUndefined = enforce("text", {
    isArray: undefined
});

const noOptionsPassExpectTrue = enforce([], {
    isArray: true
});

const noOptionsPassExpectOne = enforce([], {
    isArray: 1
});

describe('Test Passable\'s enforce function', () => {

    it('Should fail with implicitly true "expect"', () => {
        expect(failOnImplicitTrue).to.equal(false);
    });

    it('Should fail with explicitly true "expect"', () => {
        expect(faileOnExplicitTrue).to.equal(false);
    });

    it('Should pass with explicitly false "expect"', () => {
        expect(passOnExplicitFlip).to.equal(true);
    });

    it('Should fail with explicitly false "expect"', () => {
        expect(failOnExplicitFlip).to.equal(false);
    });

    it('Should fail with no options object and expect set to false', () => {
        expect(noOptionsFailExpectFalse).to.equal(false);
    });

    it('Should fail with no options object and expect set to null', () => {
        expect(noOptionsFailExpectNull).to.equal(false);
    });

    it('Should fail with no options object and expect set to zero', () => {
        expect(noOptionsFailExpectZero).to.equal(false);
    });

    it('Should fail with no options object and expect set to undefined', () => {
        expect(noOptionsFailExpectUndefined).to.equal(false);
    });

    it('Should fail with no options object and expect set to true', () => {
        expect(noOptionsFailExpectTrue).to.equal(false);
    });

    it('Should fail with no options object and expect set to one', () => {
        expect(noOptionsFailExpectOne).to.equal(false);
    });

    it('Should pass with no options object and expect set to false', () => {
        expect(noOptionsPassExpectFalse).to.equal(true);
    });

    it('Should pass with no options object and expect set to null', () => {
        expect(noOptionsPassExpectNull).to.equal(true);
    });

    it('Should pass with no options object and expect set to zero', () => {
        expect(noOptionsPassExpectZero).to.equal(true);
    });

    it('Should pass with no options object and expect set to undefined', () => {
        expect(noOptionsPassExpectUndefined).to.equal(true);
    });

    it('Should pass with no options object and expect set to true', () => {
        expect(noOptionsPassExpectTrue).to.equal(true);
    });

    it('Should pass with no options object and expect set to one', () => {
        expect(noOptionsPassExpectOne).to.equal(true);
    });
});