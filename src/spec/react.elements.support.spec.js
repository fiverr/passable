import passable, { enforce } from '../index';

describe('React Elements Support', () => {
    let result;

    beforeEach(() => {
        result = passable('NewUserForm', (test) => {
            test('username', { a: 1 }, () => {
                enforce(true).equals(false);
            });
        }).errors.username;
    });

    it('Default export should output correct version number (es6 imports)', () => {
        expect(result).to.deep.equal([{ a: 1 }]);
    });
});
