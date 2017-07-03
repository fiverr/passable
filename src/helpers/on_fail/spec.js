'use strict';

import onFail from './index';
import chai from 'chai';

const initialObject = () => (
    {
        validationErrors: {},
        validationWarnings: {},
        hasValidationErrors: false,
        hasValidationWarnings: false,
        warnCount: 0,
        failCount: 0,
        testsPerformed: {
            f1: {
                failCount: 0,
                warnCount: 0
            }
        }
    }
);

const fail = onFail('f1', 'should fail', 'fail', initialObject()),
    warn = onFail('f1', 'should warn', 'warn', initialObject());

const expect = chai.expect;

describe('Test onFail function', () => {

    it('Should return correct failing object', () => {
        expect(fail).to.deep.equal({
            failCount: 1,
            warnCount: 0,
            hasValidationErrors: true,
            hasValidationWarnings: false,
            testsPerformed: {
                f1: { failCount: 1, warnCount: 0 }
            },
            validationErrors: { f1: ['should fail'] },
            validationWarnings: {}
        });
    });

    it('Should return correct warning object', () => {
        expect(warn).to.deep.equal({
            failCount: 0,
            warnCount: 1,
            hasValidationErrors: false,
            hasValidationWarnings: true,
            testsPerformed: {
                f1: { failCount: 0, warnCount: 1 }
            },
            validationErrors: {},
            validationWarnings: { f1: ['should warn'] }
        });
    });
});