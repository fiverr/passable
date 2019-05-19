declare module 'passable' {

    const passable: Passable;
    const enforce: (value) => PassableNS.IEnforceInstance;
    const Enforce: PassableNS.IEnforceConstructor;
    const validate: PassableNS.IValidate;
    const WARN: PassableNS.IWARN;
    const FAIL: PassableNS.IFAIL;
    const VERSION: PassableNS.IVERSION;

    export default passable;
    export { enforce, Enforce, validate, WARN, FAIL, VERSION };

    interface Passable {
        (name: string, testFn: (test: (name: string, errorMessage: string, callback: PassableNS.IFunctionOrPromise) => void,
            draft: PassableNS.IValidationResult) => void,
            specific?: string | string[] | {only?: string | string[], not?: string | string[]}):
            PassableNS.IValidationResult,
        enforce(value): PassableNS.IEnforceInstance;
        Enforce: PassableNS.IEnforceConstructor;
        validate: PassableNS.IValidate;
        VERSION: PassableNS.IVERSION;
        WARN: PassableNS.IWARN;
        FAIL: PassableNS.IFAIL;
    }

    namespace PassableNS {

        export interface IValidationResult {
            /**
             * The name of the form being validated
             */
            name: string;
            /**
             * Overall errors count in current validation suite
             */
            failCount: number;
            /**
             * Whether the validation suite contains errors or not
             */
            hasValidationErrors: boolean;
            /**
             * Whether the validation suite contains warnings or not
             */
            hasValidationWarnings: boolean;
            /**
             * All skipped fields in suite (empty, unless the specific option is used)
             */
            skipped: string[];
            /**
             * Overall warnings count in current validation suite
             */
            testCount: number;
            /**
             * Detailed stats per field (structure detailed below)
             */
            testsPerformed: {
                [fieldName: string]: {
                    /**
                     * Overall test count in this field
                     */
                    testCount: number;
                    /**
                     * Overall errors count for this field
                     */
                    failCount: number;
                    /**
                     * Overall warnings count for this field
                     */
                    warnCount: number;
                }
            };
            /**
             * Actual errors per each field
             */
            validationErrors: {
                [fieldName: string]: string[];
            };
            /**
             * Actual errors per each field
             */
            validationWarnings: {
                [fieldName: string]: string[];
            };
            /**
             * Overall warnings count for this form
             */
            warnCount: number;
            /**
             * Getter function which allows accessing the errors array of a certain field (or the whole suite if not supplied)
             */
            getErrors: (field?: string) => any[];
            /**
             * Getter function which allows accessing the warnings array of a certain field (or the whole suite if not supplied)
             */
            getWarnings: (field?: string) => any[];
            /**
             * Returns whether a certain field (or the whole suite if not supplied) has errors
             */
            hasErrors: (field?: string) => boolean;
            /**
             * Returns whether a certain field (or the whole suite if not supplied) has warnings
             */
            hasWarnings: (field?: string) => boolean;
        }

        export type IFunctionOrPromise = () => void | Promise<any>;

        export type IVERSION = string;
        export type IWARN = 'warn';
        export type IFAIL = 'fail';

        export interface IValidate {
            (): boolean;
        }

        type IEnforceChain<T> = {
            [K in keyof T]: IEnforceInstance
        };

        export type IEnforceConstructor = {
            new(): (value) => IEnforceInstance;
            new<T extends { [key: string]: (...args) => boolean }>
                (arg: T): (value) => IEnforceInstance<IEnforceChain<T>>;
        };

        export interface IEnforceInstance<T = {}> {
            /**
             * Checks if a value contains a regex match by Regex expression
             *
             * @example
             *  enforce(1984).matches(/[0-9]/) // truthy
             *
             *  enforce('nineteen eighty four').matches(/[0-9]/) // falsy
             */
            matches(regex: RegExp): IEnforceInstance & T;

            /**
             * Checks if a value contains a regex match by a string expression
             *
             * @example
             *  enforce(1984).matches('[0-9]') //truthy
             *
             *  enforce('nineteen eighty four').matches('[0-9]') // falsy
             */
            matches(regexAsString: string): IEnforceInstance & T;

            /**
             * Checks if a value doesn't contains a regex match by Regex expression
             *
             * @example
             *  enforce(1984).notMatches(/[0-9]/) // falsy
             */
            notMatches(regex: RegExp): IEnforceInstance & T;

            /**
             * Checks if a value doesn't contains a regex match by string expression
             *
             * @example
             *  enforce('nineteen eighty four').notMatches('[0-9]') // truthy
             */
            notMatches(regexAsString: string): IEnforceInstance & T;

            /**
             * Checks if your enforce value is contained in another array
             *
             * @example
             *  enforce('hello').inside(['hello', 'world']) // truthy
             *
             *  enforce(3).inside([1, 2]) // falsy
             *
             *  enforce(false).inside([true, false]) // truthy
             */
            inside(array: number[] | string[] | boolean[]): IEnforceInstance & T;
            /**
             * Checks if your enforce value is contained in another string
             *
             * @example
             *  enforce('da').inside('tru dat.') // truthy
             *
             *  enforce('ad').inside('tru dat.') // falsy
             */
            inside(text: string): IEnforceInstance & T;

            /**
             * Checks if your enforce value is not contained in another array
             *
             * @example
             *  enforce('hello').notInside(['hello', 'world']) // falsy
             */
            notInside(array: number[] | string[] | boolean[]): IEnforceInstance & T;
            /**
             * Checks if your enforce value is not contained in another string
             *
             * @example
             *  enforce('ad').notInside('tru dat.') // truthy
             */
            notInside(text: string): IEnforceInstance & T;

            /**
             * Checks if a value is of type Array
             *
             * @example
             *  enforce(['hello']).isArray() // truthy
             *
             *  enforce('hello').isArray() // falsy
             *
             *  enforce(['hello']).isArray(false) // falsy
             */
            isArray(expect?: boolean): IEnforceInstance & T;

            /**
             * Checks if a value is of any type other than array
             *
             * @example
             *  enforce(['hello']).isNotArray() // falsy
             *
             *  enforce('hello').isNotArray() // truthy
             */
            isNotArray(expect?: boolean): IEnforceInstance & T;

            /**
             * Checks if a value is of type String
             *
             * @example
             *  enforce('hello').isString() // truthy
             *
             *  enforce(['hello']).isString() // falsy
             *
             *  enforce('hello').isString(false) // falsy
             */
            isString(expect?: boolean): IEnforceInstance & T;

            /**
             * Checks if a value is of any type other than string
             *
             * @example
             *  enforce('hello').isNotString() // falsy
             *
             *  enforce(['hello']).isNotString() // truthy
             *
             *  enforce('hello').isNotString(false) // truthy
             */
            isNotString(expect?: boolean): IEnforceInstance & T;

            /**
             * Checks if a value is of type number
             *
             * @example
             *  enforce(143).isNumber() // truthy
             *
             *  enforce(NaN).isNumber() // truthy! (NaN is of type 'number!')
             *
             *  enforce(143).isNumber(false) // falsy
             */
            isNumber(expect?: boolean): IEnforceInstance & T;

            /**
             * Checks if a value is of any type other than number
             *
             * @example
             *  enforce(143).isNotNumber() // falsy
             *
             *  enforce('143').isNotNumber() // truthy
             */
            isNotNumber(expect?: boolean): IEnforceInstance & T;

            /**
             * Checks if your enforce value is empty, false, zero, null or undefined
             *
             * @example
             *  enforce([]).isEmpty() // truthy
             *
             *  enforce('').isEmpty() // truthy
             *
             *  enforce({}).isEmpty() // truthy
             */
            isEmpty(expect?: boolean): IEnforceInstance & T;

            /**
             * Checks that your enforce value is not empty, false, or zero
             *
             * @example
             *
             *  enforce([1]).isNotEmpty() // truthy
             *
             *  enforce({1:1}).isNotEmpty() // truthy
             *
             *  enforce([]).isNotEmpty() // falsy
             */
            isNotEmpty(expect?: boolean): IEnforceInstance & T;

            /**
             * Checks that your enforce value is larger than a given number
             *
             * @example
             *
             *  enforce([1]).largerThan(0) // truthy
             *
             *  enforce('').largerThan(0) // falsy
             */
            largerThan(size: number): IEnforceInstance & T;

            /**
             * Checks that your enforce value is larger than or equals a given number
             *
             * @example
             *
             *  enforce([1]).largerThanOrEquals(1) // truthy
             *
             *  enforce(0).largerThanOrEquals(1) // falsy
             */
            largerThanOrEquals(size: number): IEnforceInstance & T;

            /**
             * Checks that your enforce value equals the size of a given number
             *
             * @example
             *
             *  enforce([1]).sizeEquals(0) // truthy
             *
             *  enforce('hell').sizeEquals([1,2,3,4]) // truthy
             *
             *  enforce({1:1, 2:2}).sizeEquals([1, 2, 3]) // falsy
             */
            sizeEquals(size: number): IEnforceInstance & T;

            /**
             * Checks that your enforce value does not equal the size of a given number
             *
             * @example
             *
             *  enforce([1]).sizeNotEquals(2) // truthy
             *
             *  enforce([1]).sizeNotEquals(0) // falsy
             */
            sizeNotEquals(size: number): IEnforceInstance & T;

            /**
             * Checks that your enforce value is smaller than a given number
             *
             * @example
             *
             *  enforce([]).smallerThan(1) // truthy
             *
             *  enforce([1]).smallerThan(1) // falsy
             */
            smallerThan(size: number): IEnforceInstance & T;

            /**
             * Checks that your enforce value is a numeric value
             *
             * @example
             *
             *  enforce('-0x42').isNumeric() // falsy
             *
             *  enforce('0xFF').isNumeric() // truthy
             */
            isNumeric(): IEnforceInstance & T;

            /**
             * Checks that your enforce value is not a numeric value
             *
             * @example
             *
             *  enforce('7.2acdgs').isNotNumeric() // truthy
             *
             *  enforce('-10').isNotNumeric() // falsy
             */
            isNotNumeric(): IEnforceInstance & T;

            /**
             * Checks that your enforce value is smaller than or equals another value
             *
             * @example
             *
             *  enforce([]).smallerThanOrEquals(1) // truthy
             *
             *  enforce('0').smallerThanOrEquals(0) // falsy
             */
            smallerThanOrEquals(size: number): IEnforceInstance & T;

            /**
             * Checks that your numeric enforce value is smaller than another value
             *
             * @example
             *
             *  enforce(0).lessThan(1) // truthy
             *
             *  enforce('1').lessThan(0) // falsy
             */
            lessThan(size: number): IEnforceInstance & T;

            /**
             * Checks that your numeric enforce value is smaller than another value
             *
             * @example
             *
             *  enforce(0).lt(1) // truthy
             *
             *  enforce('1').lt(0) // falsy
             */

            lt(size: number): IEnforceInstance & T;
            /**
             * Checks that your numeric enforce value is smaller than or equals another value
             *
             * @example
             *
             *  enforce(0).lessThanOrEquals(1) // truthy
             *
             *  enforce('1').lessThanOrEquals(1) // truthy
             *
             *  enforce(2).lessThanOrEquals(1) // falsy
             */
            lessThanOrEquals(size: number): IEnforceInstance & T;

            /**
             * Checks that your numeric enforce value is smaller than or equals another value
             *
             * @example
             *
             *  enforce(0).lte(1) // truthy
             *
             *  enforce('1').lte(1) // truthy
             *
             *  enforce(2).lte('1') // falsy
             */
            lte(size: number): IEnforceInstance & T;

            /**
             * Checks that your numeric enforce value is greater than another value
             *
             * @example
             *
             *  enforce(1).greaterThan(0) // truthy
             *
             *  enforce('0').greaterThan('1') // falsy
             */
            greaterThan(size: number): IEnforceInstance & T;

            /**
             * Checks that your numeric enforce value is greater than another value
             *
             * @example
             *
             *  enforce(1).gt(0) // truthy
             *
             *  enforce(0).gt('1') // falsy
             */

            gt(size: number): IEnforceInstance & T;
            /**
             * Checks that your numeric enforce value is greater than or equals another value
             *
             * @example
             *
             *  enforce(1).greaterThanOrEquals(1) // truthy
             *
             *  enforce('1').greaterThanOrEquals(0) // truthy
             *
             *  enforce('2').greaterThanOrEquals(3) // falsy
             */
            greaterThanOrEquals(size: number): IEnforceInstance & T;

            /**
             * Checks that your numeric enforce value is greater than or equals another value
             *
             * @example
             *
             *  enforce(1).gte(1) // truthy
             *
             *  enforce('1').gte(0) // truthy
             *
             *  enforce(2).gte('3') // falsy
             */
            gte(size: number): IEnforceInstance & T;
        }
    }
}
