declare module 'passable' {

    const passable: Passable;
    const enforce: (value: any) => PassableNS.IEnforce;
    const Enforce: PassableNS.IEnforceConstructor;
    const validate: PassableNS.IValidate;
    const WARN: PassableNS.IWARN;
    const FAIL: PassableNS.IFAIL;
    const VERSION: PassableNS.IVERSION;

    export default passable;
    export { enforce, Enforce, validate, WARN, FAIL, VERSION };

    interface Passable {
        (name: string, testFn: (test: (name: string, errorMessage: string, callback: PassableNS.IFunctionOrPromise) => void) => void,
            specific?: string | string[] | {only?: string | string[], not?: string | string[]}):
            PassableNS.IPassableInstance,
        enforce(value: any): PassableNS.IEnforce;
        Enforce: PassableNS.IEnforceConstructor;
        validate: PassableNS.IValidate;
        VERSION: PassableNS.IVERSION;
        WARN: PassableNS.IWARN;
        FAIL: PassableNS.IFAIL;
    }

    namespace PassableNS {
    
        export interface IPassableInstance {
            /**
             * The name of the form being validated
             */
            name: string;
            /**
             * Contains async tests and their current completion status
             */
            async: any;
            /**
             * Overall errors count for this form
             */
            failCount: number;
            /**
             * Whether there are validation errors or not
             */
            hasValidationErrors: boolean;
            /**
             * Whether there are validation warnings or not
             */
            hasValidationWarnings: boolean;
            /**
             * All skipped fields (empty, unless the specific option is used)
             */
            skipped: any[];
            /**
             * Overall test count in this form
             */
            testCount: number;
            /**
             * Detailed stats per field (structure detailed below)
             */
            testsPerformed: any;
            /**
             * Actual errors per each field
             */
            validationErrors: any;
            /**
             * Actual errors per each field
             */
            validationWarnings: any;
            /**
             * Overall warnings count for this form
             */
            warnCount: number;
            /**
             * Getter function which allows accessing the errors array of a certain field
             */
            getErrors: (field: string) => any[];
            /**
             * Getter function which allows accessing the errors array of all fields
             */
            getErrors: () => any[];
            /**
             * Getter function which allows accessing the warnings array of a certain field
             */
            getWarnings: (field: string) => any[];
            /**
             * Getter function which allows accessing the warnings array of all fields
             */
            getWarnings: () => any[];
            /**
             * Returns whether a certain field has errors
             */
            hasErrors: (field: string) => boolean;
            /**
             * Returns whether the whole suite has errors
             */
            hasErrors: () => boolean;
            /**
             * Returns whether a certain field has warnings
             */
            hasWarnings: (field: string) => boolean;
            /**
             * Returns whether the whole suite has warnings
             */
            hasWarnings: () => boolean;
        }

        export type IFunctionOrPromise = () => void | Promise;

        export type IVERSION = string;
        export type IWARN = 'warn';
        export type IFAIL = 'fail';

        export interface IValidate {
            (): boolean;
        }

        export type IEnforceConstructor = {
            new(): (value: any) => IEnforce;
            new<T extends { [key: string]: (...args: any[]) => IEnforce<T> }>
                (arg: T): (value: any) => IEnforce<T>;
        };

        export interface IEnforce<T = {}> {
            /**
             * Checks if a value contains a regex match by Regex expression
             * 
             * @example
             *  enforce(1984).matches(/[0-9]/) // truthy
             * 
             *  enforce('ninety eighty four').matches(/[0-9]/) // falsy
             */
            matches(regex: RegExp): IEnforce & T;
    
            /**
             * Checks if a value contains a regex match by a string expression
             * 
             * @example
             *  enforce(1984).matches('[0-9]') //truthy
             * 
             *  enforce('ninety eighty four').matches('[0-9]') // falsy
             */
            matches(regexAsString: string): IEnforce & T;
    
            /**
             * Checks if a value doesn't contains a regex match by Regex expression
             * 
             * @example
             *  enforce(1984).notMatches(/[0-9]/) // falsy
             */
            notMatches(regex: RegExp): IEnforce & T;
    
            /**
             * Checks if a value doesn't contains a regex match by string expression
             * 
             * @example
             *  enforce('ninety eighty four').notMatches('[0-9]') // truthy
             */
            notMatches(regexAsString: string): IEnforce & T;
    
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
            inside(array: number[] | string[] | boolean[]): IEnforce & T;
            /**
             * Checks if your enforce value is contained in another string
             * 
             * @example
             *  enforce('da').inside('tru dat.') // truthy
             * 
             *  enforce('ad').inside('tru dat.') // falsy
             */
            inside(text: string): IEnforce & T;
    
            /**
             * Checks if your enforce value is not contained in another array
             * 
             * @example
             *  enforce('hello').notInside(['hello', 'world']) // falsy
             */
            notInside(array: number[] | string[] | boolean[]): IEnforce & T;
            /**
             * Checks if your enforce value is not contained in another string
             * 
             * @example
             *  enforce('ad').notInside('tru dat.') // truthy
             */
            notInside(text: string): IEnforce & T;
    
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
            isArray(expect?: boolean): IEnforce & T;
    
            /**
             * Checks if a value is of any type other than array
             * 
             * @example
             *  enforce(['hello']).isNotArray() // falsy
             * 
             *  enforce('hello').isNotArray() // truthy
             */
            isNotArray(expect?: boolean): IEnforce & T;
    
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
            isString(expect?: boolean): IEnforce & T;
    
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
            isNotString(expect?: boolean): IEnforce & T;
    
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
            isNumber(expect?: boolean): IEnforce & T;
    
            /**
             * Checks if a value is of any type other than number
             * 
             * @example
             *  enforce(143).isNotNumber() // falsy
             * 
             *  enforce('143').isNotNumber() // truthy
             */
            isNotNumber(expect?: boolean): IEnforce & T;
    
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
            isEmpty(expect?: boolean): IEnforce & T;
    
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
            isNotEmpty(expect?: boolean): IEnforce & T;
    
            /**
             * Checks that your enforce value is larger than a given number
             * 
             * @example
             * 
             *  enforce([1]).largerThan(0) // truthy
             * 
             *  enforce('').largerThan(0) // falsy
             */
            largerThan(size: number): IEnforce & T;
    
            /**
             * Checks that your enforce value is larger than or equals a given number
             * 
             * @example
             * 
             *  enforce([1]).largerThanOrEquals(1) // truthy
             * 
             *  enforce(0).largerThanOrEquals(1) // falsy
             */
            largerThanOrEquals(size: number): IEnforce & T;
    
            /**
             * Checks that your enforce value equals the size than a given number
             * 
             * @example
             * 
             *  enforce([1]).sizeEquals(0) // truthy
             * 
             *  enforce('hell').sizeEquals([1,2,3,4]) // truthy
             * 
             *  enforce({1:1, 2:2}).sizeEquals([1, 2, 3]) // falsy
             */
            sizeEquals(size: number): IEnforce & T;
    
            /**
             * Checks that your enforce value does not equal the size of a given number
             * 
             * @example
             * 
             *  enforce([1]).sizeNotEquals(2) // truthy
             * 
             *  enforce([1]).sizeNotEquals(0) // falsy
             */
            sizeNotEquals(size: number): IEnforce & T;
    
            /**
             * Checks that your enforce value is smaller than a given number
             * 
             * @example
             * 
             *  enforce([]).smallerThan(1) // truthy
             * 
             *  enforce([1]).smallerThan(1) // falsy
             */
            smallerThan(size: number): IEnforce & T;
    
            /**
             * Checks that your enforce value is a numeric value
             * 
             * @example
             * 
             *  enforce('-0x42').isNumeric() // falsy
             * 
             *  enforce('0xFF').isNumeric() // truthy
             */
            isNumeric(): IEnforce & T;
    
            /**
             * Checks that your enforce value is not a numeric value
             * 
             * @example
             * 
             *  enforce('7.2acdgs').isNotNumeric() // truthy
             * 
             *  enforce('-10').isNotNumeric() // falsy
             */
            isNotNumeric(): IEnforce & T;
    
            /**
             * Checks that your enforce value is smaller than or equals another value
             * 
             * @example
             * 
             *  enforce([]).smallerThanOrEquals(1) // truthy
             * 
             *  enforce('0').smallerThanOrEquals(0) // falsy
             */
            smallerThanOrEquals(size: number): IEnforce & T;
        }
    }
}
