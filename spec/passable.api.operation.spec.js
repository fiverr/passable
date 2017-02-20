'use strict'

import Passable from '../src/Passable.js';
import chai from 'chai';

const expect = chai.expect;

const pessimisticFail = new Passable('pessimistic-fail', 'pessimistic', function() {});
const pessimisticPass = new Passable('pessimistic-pass', 'pessimistic', function(pass, group) {
    pass('pessimisticPass', 'should pass', () => true);
});

describe('Test pessimistic behaviour', () => {
    it('Should pessimistically fail', () => {
        expect(pessimisticFail.hasValidationErrors).to.equal(true);
    });
    it('Should pessimistically pass', () => {
        expect(pessimisticPass.hasValidationErrors).to.equal(false);
    });
});

const explicitOptimisticPass = new Passable('optimistic-pass', 'optimistic', function() {});
const explicitOptimisticFail = new Passable('optimistic-fail', 'optimistic', function(pass, group) {
    pass('ExplicitOptimisticFail', 'should Fail', () => false);
});

describe('Test explicit pessimistic behaviour', () => {
    it('Should optimistically pass', () => {
        expect(explicitOptimisticPass.hasValidationErrors).to.equal(false);
    });
    it('Should optimistically fail', () => {
        expect(explicitOptimisticFail.hasValidationErrors).to.equal(true);
    });
});


const implicitOptimisticPass = new Passable('optimistic-pass', function() {});
const implicitOptimisticFail = new Passable('optimistic-fail', function(pass, group) {
    pass('ImplicitOptimisticFail', 'should Fail', () => false);
});

describe('Test implicit pessimistic behaviour', () => {
    it('Should optimistically pass', () => {
        expect(implicitOptimisticPass.hasValidationErrors).to.equal(false);
    });
    it('Should optimistically fail', () => {
        expect(implicitOptimisticFail.hasValidationErrors).to.equal(true);
    });
});

const optimisticFallback = new Passable('optimistic-fallback-pass', 'not-pessimistic', function() {});

describe('Test fallback to optimistic behaviour', () => {
    it('Should fallback to optimistic and pass', () => {
        expect(optimisticFallback.hasValidationErrors).to.equal(false);
    });
});