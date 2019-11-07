import faker from 'faker';
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

    it('Should store instance as constructor property', () => {
        expect(Context.ctx).to.equal(instance);
    });

    describe('Context.clear', () => {
        it('Should nullify stored instance', () => {
            expect(Context.ctx).to.equal(instance);
            Context.clear();
            expect(Context.ctx).to.equal(null);
        });
    });
});
