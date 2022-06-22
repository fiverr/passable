const runSpec = (passable) => {
    describe('React Elements Support', () => {
        let result;

        beforeEach(() => {
            result = passable('NewUserForm', (test) => {
                test('username', { a: 1 }, () => {
                    passable.enforce(true).equals(false);
                });

                test('username', { a: 2 }, () => {
                    enforce(true).equals(false);
                }, passable.WARN);
            });
        });

        it('should support objects in errors', () => {
            expect(result.errors.username).to.deep.equal([{ a: 1 }]);
        });

        it('should support objects in warnings', () => {
            expect(result.warnings.username).to.deep.equal([{ a: 2 }]);
        });
    });
};

runSpec(require('../'));
runSpec(require('../../dist/passable'));
runSpec(require('../../dist/passable.min.js'));
