declare module 'passable' {
    interface Passable {
        (name: string): Passable.PassableInstance,
        static enforce(value: any): Passable.EnforceInstance,
        static Enforce(value: any): Passable.EnforceInstance
    }

    namespace Passable {
        
        interface PassableInstance {

        }

        interface EnforceInstance {
            /**
             * Checks if a value contains a regex match by Regex expression
             * 
             * @example
             *  enforce(1984).matches(/[0-9]/) // truthy
             * 
             *  enforce('ninety eighty four').matches(/[0-9]/) // falsy
             */
            matches(regex: RegExp): EnforceInstance,

            /**
             * Checks if a value contains a regex match by a string expression
             * 
             * @example
             *  enforce(1984).matches('[0-9]') //truthy
             * 
             *  enforce('ninety eighty four').matches('[0-9]') // falsy
             */
            matches(regexAsString: string): EnforceInstance,

            /**
             * Checks if a value doesn't contains a regex match by Regex expression
             * 
             * @example
             *  enforce(1984).notMatches(/[0-9]/) // falsy
             */
            notMatches(regex: RegExp): EnforceInstance,

            /**
             * Checks if a value doesn't contains a regex match by string expression
             * 
             * @example
             *  enforce('ninety eighty four').notMatches('[0-9]') // truthy
             */
            notMatches(regexAsString: string): EnforceInstance,

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
            inside(array: number[] | string[] | boolean[]): EnforceInstance,
            /**
             * Checks if your enforce value is contained in another string
             * 
             * @example
             *  enforce('da').inside('tru dat.') // truthy
             * 
             *  enforce('ad').inside('tru dat.') // falsy
             */
            inside(text: string): EnforceInstance,

            /**
             * Checks if your enforce value is not contained in another array
             * 
             * @example
             *  enforce('hello').notInside(['hello', 'world']) // falsy
             */
            notInside(array: number[] | string[] | boolean[]): EnforceInstance,
            /**
             * Checks if your enforce value is not contained in another string
             * 
             * @example
             *  enforce('ad').notInside('tru dat.') // truthy
             */
            notInside(text: string): EnforceInstance,

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
            isArray(expect?: boolean): EnforceInstance,

            /**
             * Checks if a value is of any type other than array
             * 
             * @example
             *  enforce(['hello']).isNotArray() // falsy
             * 
             *  enforce('hello').isNotArray() // truthy
             */
            isNotArray(expect?: boolean): EnforceInstance,

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
            isString(expect?: boolean): EnforceInstance,

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
            isNotString(expect?: boolean): EnforceInstance,

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
            isNumber(expect?: boolean): EnforceInstance,

            /**
             * Checks if a value is of any type other than number
             * 
             * @example
             *  enforce(143).isNotNumber() // falsy
             * 
             *  enforce('143').isNotNumber() // truthy
             */
            isNotNumber(expect?: boolean): EnforceInstance,

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
            isEmpty(expect?: boolean): EnforceInstance,

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
            isNotEmpty(expect?: boolean): EnforceInstance,

            /**
             * Checks that your enforce value is larger than a given number
             * 
             * @example
             * 
             *  enforce([1]).largerThan(0) // truthy
             * 
             *  enforce('').largerThan(0) // falsy
             */
            largerThan(size: number): EnforceInstance,

            /**
             * Checks that your enforce value is larger than or equals a given number
             * 
             * @example
             * 
             *  enforce([1]).largerThanOrEquals(1) // truthy
             * 
             *  enforce(0).largerThanOrEquals(1) // falsy
             */
            largerThanOrEquals(size: number): EnforceInstance

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
            sizeEquals(size: number): EnforceInstance,

            /**
             * Checks that your enforce value does not equal the size of a given number
             * 
             * @example
             * 
             *  enforce([1]).sizeNotEquals(2) // truthy
             * 
             *  enforce([1]).sizeNotEquals(0) // falsy
             */
            sizeNotEquals(size: number): EnforceInstance,

            /**
             * Checks that your enforce value is smaller than a given number
             * 
             * @example
             * 
             *  enforce([]).smallerThan(1) // truthy
             * 
             *  enforce([1]).smallerThan(1) // falsy
             */
            smallerThan(size: number): EnforceInstance,

            /**
             * Checks that your enforce value is a numeric value
             * 
             * @example
             * 
             *  enforce('-0x42').isNumeric() // falsy
             * 
             *  enforce('0xFF').isNumeric() // truthy
             */
            isNumeric(): EnforceInstance,

            /**
             * Checks that your enforce value is not a numeric value
             * 
             * @example
             * 
             *  enforce('7.2acdgs').isNotNumeric() // truthy
             * 
             *  enforce('-10').isNotNumeric() // falsy
             */
            isNotNumeric(): EnforceInstance,

            /**
             * Checks that your enforce value is smaller than or equals another value
             * 
             * @example
             * 
             *  enforce([]).smallerThanOrEquals(1) // truthy
             * 
             *  enforce('0').smallerThanOrEquals(0) // falsy
             */
            smallerThanOrEquals(size: number): EnforceInstance,
        }
    }

    export = Passable;
}
