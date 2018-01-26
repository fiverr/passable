'use strict';
import { expect } from 'chai';
import passable from '../index';
const passableExports = require('../index');
import { version } from '../../package.json';

describe('Test Passable\'s exports', () => {
    describe('Test passable\'s default export', () => {
        it('Default export should output correct version number', () => {
            expect(passable.VERSION).to.equal(version);
        });

        it('Default export should output correct version number', () => {
            expect(passableExports.default.VERSION).to.equal(version);
        });

        it('Default export name should be `passable`', () => {
            expect(passableExports.default.name).to.equal('passable');
        });
    });

    describe('Test enforce export', () => {
        it('enforce should be exported as a function', () => {
            expect(passableExports.enforce).to.be.a('function');
        });

        it('enforce function name should be enforce', () => {
            expect(passableExports.enforce.name).to.equal('enforce');
        });
    });
});