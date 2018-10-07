'use strict';
import { expect } from 'chai';
import passable, { Enforce, enforce, validate } from '../index';
const passableExports = require('../index');
import { version } from '../../package.json';

describe("Test Passable's exports", () => {

    it('Should expose all outward facing passable API functions', () => {
        const exportsArray = Object.keys(passableExports);
        const names = ['validate', 'enforce'];
        names.forEach((name) => {
            expect(passableExports[name]).to.be.a('function');
        });
    });

    describe("Test passable's default export", () => {
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

    describe('Test Enforce import', () => {
        it('enforce instance should be on passable (commonjs)', () => {
            expect(passableExports.enforce).to.be.a('function');
        });

        it('enforce constructor should be assigned to passable (commonjs)', () => {
            expect(passableExports.Enforce).to.be.a('function');
        });

        it('enforce instance should be on passable (es6 imports)', () => {
            expect(passable.enforce).to.be.a('function');
        });

        it('enforce constructor should be on passable (es6 imports)', () => {
            expect(passable.Enforce).to.be.a('function');
        });

        it('enforce instance should be destructurable directly from passable', () => {
            expect(enforce).to.be.a('function');
        });

        it('enforce constructor should be destructurable directly from passable', () => {
            expect(Enforce).to.be.a('function');
        });
    });

    describe('Test validate import', () => {
        it('validate should be assigned to passable (commonjs)', () => {
            expect(passableExports.validate).to.be.a('function');
        });

        it('validate should be assigned to passable (es6 imports)', () => {
            expect(passable.validate).to.be.a('function');
        });

        it('validate should be destructurable directly from passable', () => {
            expect(validate).to.be.a('function');
        });

        it('validate function name should be validate (es6 imports)', () => {
            expect(passable.validate.name).to.equal('validate');
        });

        it('validate function name should be validate (commonjs)', () => {
            expect(passableExports.validate.name).to.equal('validate');
        });
    });

    describe('Test severity imports', () => {
        it('WARN should be assigned to passable (commonjs)', () => {
            expect(passableExports.WARN).to.equal('warn');
        });

        it('WARN should be assigned to passable (es6 imports)', () => {
            expect(passable.WARN).to.equal('warn');
        });

        it('FAIL should be assigned to passable (commonjs)', () => {
            expect(passableExports.FAIL).to.equal('fail');
        });

        it('FAIL should be assigned to passable (es6 imports)', () => {
            expect(passable.FAIL).to.equal('fail');
        });
    });
});