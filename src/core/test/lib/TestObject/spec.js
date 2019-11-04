import faker from 'faker';
import _ from 'lodash';
import { expect } from 'chai';
import { WARN, FAIL } from '../../../../constants';
import passableResult from '../../../passableResult';
import TestObject from '.';

describe('TestObject module', () => {
    let testObject, parent, testFn, fieldName, statement, severity;

    beforeEach(() => {
        parent = {
            result: passableResult(faker.lorem.word()),
            pending: []
        };
        testFn = _.noop;
        fieldName = faker.lorem.word();
        statement = faker.lorem.sentence();
        severity = _.sample([WARN, FAIL]);

        testObject = new TestObject(
            parent,
            testFn,
            fieldName,
            statement,
            severity
        );
    });

    describe('.fail() methoh', () => {
        it('Should set `failed` to true', () => {
            expect(testObject.failed).to.equal(false);
            testObject.fail();
            expect(testObject.failed).to.equal(true);
        });
    });

    describe('.setPending() method', () => {
        it('Should push current instance to pending array', () => {
            expect(parent.pending).to.have.lengthOf(0);
            testObject.setPending();
            expect(parent.pending).to.have.lengthOf(1);
            expect(parent.pending).to.have.members([testObject]);
        });
    });

    describe('.clearPending() method', () => {
        beforeEach(() => {
            testObject.setPending();
        });

        it('Should push current instance to pending array', () => {
            expect(parent.pending).to.have.members([testObject]);
            testObject.clearPending();
            expect(parent.pending).not.to.have.members([testObject]);
        });
    });

    describe('.valueOf()', () => {

        describe('Default case', () => {
            it('Should return true', () => {
                expect(testObject == true).to.equal(true); // eslint-disable-line
            });
        });

        describe('When invalid', () => {

            beforeEach(() => {
                testObject.fail();
            });

            it('Should return false', () => {
                expect(testObject == false).to.equal(true); // eslint-disable-line
            });
        });
    });
});
