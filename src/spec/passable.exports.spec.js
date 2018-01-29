'use strict';
import { expect } from 'chai';
import passable, { enforce } from '../index';
const passableExports = require('../index');
import { version } from '../../package.json';

describe('Test Passable\'s exports', () => {
    describe('Test passable\'s default export', () => {
        it('Default export should output correct version number (es6 imports)', () => {
            expect(passable.VERSION).to.equal(version);
        });

        it('Default export should output correct version number (commonjs)', () => {
            expect(passableExports.VERSION).to.equal(version);
        });

        it('Default export name should be `passable` (commonjs)', () => {
            expect(passableExports.name).to.equal('passable');
        });

        it('Default export name should be `passable` (es6 imports)', () => {
            expect(passable.name).to.equal('passable');
        });
    });

    describe('Test enforce import', () => {
        it('enforce should be assigned to passable (commonjs)', () => {
            expect(passableExports.enforce).to.be.a('function');
        });

        it('enforce should be assigned to passable (es6 imports)', () => {
            expect(passable.enforce).to.be.a('function');
        });

        it('enforce should be destrucurable directly from passable', () => {
            expect(enforce).to.be.a('function');
        });

        it('enforce function name should be enforce (es6 imports)', () => {
            expect(passable.enforce.name).to.equal('enforce');
        });

        it('enforce function name should be enforce (commonjs)', () => {
            expect(passableExports.enforce.name).to.equal('enforce');
        });
    });
});