import Mocha from 'mocha';
import faker from 'faker';
import { ERROR_NO_CONTEXT } from './constants';

const runSpec = (passable) => {
    let suite;
    const { WARN } = passable;

    const createSuite = (tests) => {
        suite = passable(faker.random.word(), tests);
    };

    describe('Draft', () => {

        it('Should be `tests` second argument', (done) => {
            createSuite((test, draft) => {
                setTimeout(() => {
                    expect(draft).to.deep.equal(suite);
                    done();
                }, 10);
            });
        });

        it('Should be exposed as a function from passable', () => {
            createSuite((test, draft) => {
                expect(passable.draft()).to.equal(draft);
            });
        });

        it('Should contain intermediate test result', () => {
            // This test is so long because it tests `draft` throughout
            // a suite's life cycle, both as an argument, and as an import
            createSuite((test, draft) => {
                expect(draft.testCount).to.equal(0);
                expect(passable.draft().testCount).to.equal(0);
                expect(draft.failCount).to.equal(0);
                expect(passable.draft().failCount).to.equal(0);
                expect(draft.warnCount).to.equal(0);
                expect(passable.draft().warnCount).to.equal(0);
                expect(draft.hasErrors()).to.equal(false);
                expect(passable.draft().hasErrors()).to.equal(false);
                expect(draft.hasWarnings()).to.equal(false);
                expect(passable.draft().hasWarnings()).to.equal(false);
                expect(draft.skipped).to.deep.equal([]);
                expect(passable.draft().skipped).to.deep.equal([]);

                expect(draft.hasErrors('field1')).to.equal(false);
                expect(passable.draft().hasErrors('field1')).to.equal(false);
                test('field1', 'message', () => expect(1).to.equal(2));
                expect(draft.testCount).to.equal(1);
                expect(passable.draft().testCount).to.equal(1);
                expect(draft.failCount).to.equal(1);
                expect(passable.draft().failCount).to.equal(1);
                expect(draft.warnCount).to.equal(0);
                expect(passable.draft().warnCount).to.equal(0);
                expect(draft.hasErrors()).to.equal(true);
                expect(passable.draft().hasErrors()).to.equal(true);
                expect(draft.hasErrors('field1')).to.equal(true);
                expect(passable.draft().hasErrors('field1')).to.equal(true);
                expect(draft.hasWarnings()).to.equal(false);
                expect(passable.draft().hasWarnings()).to.equal(false);

                test('field2', 'message', () => expect(2).to.equal(2));
                expect(draft.testCount).to.equal(2);
                expect(passable.draft().testCount).to.equal(2);
                expect(draft.failCount).to.equal(1);
                expect(passable.draft().failCount).to.equal(1);
                expect(draft.warnCount).to.equal(0);
                expect(passable.draft().warnCount).to.equal(0);
                expect(draft.hasErrors()).to.equal(true);
                expect(passable.draft().hasErrors()).to.equal(true);
                expect(draft.hasWarnings()).to.equal(false);
                expect(passable.draft().hasWarnings()).to.equal(false);

                expect(draft.hasWarnings('field3')).to.equal(false);
                expect(passable.draft().hasWarnings('field3')).to.equal(false);
                test('field3', 'message', () => expect(2).to.equal(1), WARN);
                expect(draft.testCount).to.equal(3);
                expect(passable.draft().testCount).to.equal(3);
                expect(draft.failCount).to.equal(1);
                expect(passable.draft().failCount).to.equal(1);
                expect(draft.warnCount).to.equal(1);
                expect(passable.draft().warnCount).to.equal(1);
                expect(draft.hasErrors()).to.equal(true);
                expect(passable.draft().hasErrors()).to.equal(true);
                expect(draft.hasWarnings()).to.equal(true);
                expect(passable.draft().hasWarnings()).to.equal(true);
                expect(draft.hasWarnings('field3')).to.equal(true);
                expect(passable.draft().hasWarnings('field3')).to.equal(true);

                test('field4', 'message', Promise.resolve(), WARN);
                expect(draft.testCount).to.equal(4);
                expect(passable.draft().testCount).to.equal(4);
                expect(draft.failCount).to.equal(1);
                expect(passable.draft().failCount).to.equal(1);
                expect(draft.warnCount).to.equal(1);
                expect(passable.draft().warnCount).to.equal(1);
                expect(draft.hasErrors()).to.equal(true);
                expect(passable.draft().hasErrors()).to.equal(true);
                expect(draft.hasWarnings()).to.equal(true);
                expect(passable.draft().hasWarnings()).to.equal(true);
                expect(draft.hasWarnings('field4')).to.equal(false);
                expect(passable.draft().hasWarnings('field4')).to.equal(false);
            });
        });
    });

    describe('When called outside of a running suite', () => {
        let _uncaughtListeners;

        beforeEach(() => {
            _uncaughtListeners = process.listeners('uncaughtException');
            process.removeAllListeners('uncaughtException');
        });

        afterEach(() => {
            _uncaughtListeners.forEach((listener) => process.on('uncaughtException', listener));
        });

        it('Should throw an error', (done) => {
            process.on('uncaughtException', (err) => {
                expect(err.message).to.have.string(ERROR_NO_CONTEXT);
                process.removeAllListeners('uncaughtException');
                done();
            });
            passable.draft();
        });
    });
};

runSpec(require('../../'));
runSpec(require('../../../dist/passable'));
runSpec(require('../../../dist/passable.min.js'));
