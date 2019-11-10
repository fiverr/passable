import _ from 'lodash';
import faker from 'faker';
import { test } from 'mocha';
import passable from '../../';
import Context from '../../core/Context';
import singleton from '.';
import go from '../globalObject';
import { SYMBOL_PASSABLE } from './constants';

describe('singleton', () => {

    after(() => {
        singleton.register(passable);
    });

    describe('Attaching to global scope', () => {
        beforeEach(() => {
            delete go[SYMBOL_PASSABLE];
        });

        afterEach(() => {
            delete go[SYMBOL_PASSABLE];
        });

        test('That global instance is not populated', () => {
            expect(go[SYMBOL_PASSABLE]).to.equal(undefined);
        });

        it('Should register passable on a global object', () => {
            singleton.register(passable, Context);

            expect(go[SYMBOL_PASSABLE]).to.equal(passable);
        });

        describe('When already registered', () => {

            beforeEach(() => {
                singleton.register(passable);
            });

            describe('When same version', () => {
                it('Should return silently', (done) => {
                    const timeout = setTimeout(done, 300);

                    process.on('uncaughtException', (err) => {
                        clearTimeout(timeout);
                    });

                });
            });

            describe('When different version', () => {

                let _uncaughtListeners;

                beforeEach(() => {
                    _uncaughtListeners = process.listeners('uncaughtException');
                    process.removeAllListeners('uncaughtException');
                });

                afterEach(() => {
                    _uncaughtListeners.forEach((listener) => process.on('uncaughtException', listener));
                });

                it('Should throw an error', (done) => {
                    const fn = () => null;
                    fn.VERSION = Math.random();

                    singleton.register(fn);

                    process.on('uncaughtException', (err) => {
                        expect(err.message).to.have.string('Multiple versions of Passable detected');
                        process.removeAllListeners('uncaughtException');
                        done();
                    });

                });
            });
        });

    });

    describe('Make sure everything works together', () => {

        before(() => {
            singleton.register(passable);
        });

        const instances = [require('../../'), require('../../../dist/passable'), require('../../../dist/passable.min.js')];
        const pairs = instances.reduce((pairs, current) => (
            [...pairs, ...instances.map(({ test }) => [ current, test ])]
        ), []);

        pairs.forEach(([ passable, test ]) => {
            it('Should produce correct validation result', () => {
                const failCount = _.random(1, 10);
                const successCount = _.random(1, 10);
                const warnCount = _.random(1, 10);
                const output = passable(faker.random.word(), () => {

                    Array.from({ length: warnCount }, () => test(faker.random.word(), faker.lorem.sentence(), () => false, passable.WARN));
                    Array.from({ length: failCount }, () => test(faker.random.word(), faker.lorem.sentence(), () => false));
                    Array.from({ length: successCount }, () => test(faker.random.word(), faker.lorem.sentence(), () => true));
                });

                expect(output.failCount).to.equal(failCount);
                expect(output.warnCount).to.equal(warnCount);
                expect(output.testCount).to.equal(warnCount + failCount + successCount);
            });
        });
    });
});
