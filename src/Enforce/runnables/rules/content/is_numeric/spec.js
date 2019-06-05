import { expect } from 'chai';
import isNumeric from './index';

const NUMERICS = [
    '-10',
    '0',
    0xFF,
    '0xFF',
    '8e5',
    '3.1415',
    +10,
    '0144'
];

const NON_NUMERICS = [
    '-0x42',
    '7.2acdgs',
    '',
    {},
    NaN,
    null,
    true,
    Infinity,
    undefined
];

describe('Tests isNumeric rule', () => {

    it('Should return true for numeric values', () => {
        NUMERICS.forEach((value) => expect(isNumeric(value)).to.equal(true));
    });

    it('Should return false for non numeric values', () => {
        NON_NUMERICS.forEach((value) => expect(isNumeric(value)).to.equal(false));
    });

    it('Should expose negativeForm property', () => {
        expect(isNumeric.negativeForm).to.equal('isNotNumeric');
    });
});