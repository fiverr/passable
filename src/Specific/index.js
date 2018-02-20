// @flow
import { runtimeError } from 'Helpers';
import { Errors } from 'Constants';

/** Class representing validation inclusion and exclusion groups */
class Specific {
    not: SpecificGroup;
    only: SpecificGroup;

    /**
     * Initialize Specific object
     *
     * @param {String | Array | Object | undefined} specific
     */
    constructor(specific: ?SpecificArgs) {

        if (!specific) { return;}

        if (!Specific.is(specific)) {
            throw runtimeError(Errors.UNEXPECTED_ARGUMENT_SPECIFIC, typeof specific);
        }

        if (!specific) { return;}

        if (typeof specific === 'string' || Array.isArray(specific)) {
            if (specific.length === 0) { return; }
            this.only = this.populateGroup(this.only, specific);
            return;
        }

        if (specific.only) {
            this.only = this.populateGroup(this.only, specific.only);
        }

        if (specific.not) {
            this.not = this.populateGroup(this.not, specific.not);
        }
    }

    /**
     * Populate inclusion and exclusion groups
     *
     * @param {Object} group - the group to populate.
     * @param {String | Array} field - the field to add to the group
     * @return {Object} modified group
     */
    populateGroup(group: SpecificGroup, field: SpecificField) {
        group = group || {};

        if (typeof field === 'string') {
            group[field] = true;
        } else if (Array.isArray(field)) {
            field.forEach((item) => group[item] = true);
        }

        return group;
    }

    /**
     * Checkes whether a given field name is in exclusion group
     * or not a member of inclusion group (when present)
     *
     * @param {String} fieldName
     * @return {Boolean}
     */
    excludes(fieldName: string) {
        if (this.only && !this.only[fieldName]) {
            return true;
        }

        if (this.not && this.not[fieldName]) {
            return true;
        }

        return false;
    }

    /**
     * Test whether a given argument matches
     * the `specific` filter convention
     *
     * @param {Any} item
     * @return {boolean}
     */
    static is(item: AnyValue) {
        if (Array.isArray(item)) {
            return item.every((item) => typeof item === 'string');
        }

        if (typeof item === 'string') { return true; }

        if (item !== null && typeof item === 'object' && (
            item.hasOwnProperty('only')
            || item.hasOwnProperty('not')
        )) {
            return true;
        }

        return false;
    }

}

export default Specific;