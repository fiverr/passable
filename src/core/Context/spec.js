import faker from 'faker';
import { singleton } from '../../lib';
import Context from '.';

describe('Context', () => {
    let parent, instance;

    beforeEach(() => {

        parent = {
            [faker.random.word()]: faker.random.word(),
            [faker.random.word()]: faker.random.word(),
            [faker.random.word()]: faker.random.word()
        };

        instance = new Context(parent);
    });

    it('Should assign all parent properties onto ctx instance', () => {
        Object.keys(parent).forEach((key) => {
            expect(instance[key]).to.equal(parent[key]);
        });
    });

    it('Should store instance on singleton', () => {
        expect(singleton.use().ctx).to.equal(instance);
    });

    describe('Context.clear', () => {
        it('Should nullify stored instance', () => {
            expect(singleton.use().ctx).to.equal(instance);
            Context.clear();
            expect(singleton.use().ctx).to.equal(null);
        });
    });
});
