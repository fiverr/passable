import passable, {WARN} from '../index.js';
import ResultObject from '../result_object';
import faker from 'faker';
import {expect} from 'chai';
let suite;

const createSuite = (tests) => {
    suite = passable(faker.random.word(), tests);
};

describe('Test suite `draft` argument', () => {

    it('Should be `tests` second argument', () => {
        createSuite((test, draft) => {
            expect(draft).to.be.instanceOf(ResultObject);
        });
    });

    it('Should contain intermediate test result', () => {
        createSuite((test, draft) => {
            expect(draft.testCount).to.equal(0);
            expect(draft.failCount).to.equal(0);
            expect(draft.warnCount).to.equal(0);
            expect(draft.hasValidationErrors).to.equal(false);
            expect(draft.hasValidationWarnings).to.equal(false);
            expect(draft.skipped).to.deep.equal([]);
            expect(draft.async).to.equal(null);

            test('field1', 'message', () => expect(1).to.equal(2));
            expect(draft.testCount).to.equal(1);
            expect(draft.failCount).to.equal(1);
            expect(draft.warnCount).to.equal(0);
            expect(draft.hasValidationErrors).to.equal(true);
            expect(draft.hasValidationWarnings).to.equal(false);

            test('field2', 'message', () => expect(2).to.equal(2));
            expect(draft.testCount).to.equal(2);
            expect(draft.failCount).to.equal(1);
            expect(draft.warnCount).to.equal(0);
            expect(draft.hasValidationErrors).to.equal(true);
            expect(draft.hasValidationWarnings).to.equal(false);

            test('field3', 'message', () => expect(2).to.equal(1), WARN);
            expect(draft.testCount).to.equal(3);
            expect(draft.failCount).to.equal(1);
            expect(draft.warnCount).to.equal(1);
            expect(draft.hasValidationErrors).to.equal(true);
            expect(draft.hasValidationWarnings).to.equal(true);

            test('field4', 'message', Promise.resolve(), WARN);
            expect(draft.testCount).to.equal(3);
            expect(draft.failCount).to.equal(1);
            expect(draft.warnCount).to.equal(1);
            expect(draft.hasValidationErrors).to.equal(true);
            expect(draft.hasValidationWarnings).to.equal(true);
        });
    });
});