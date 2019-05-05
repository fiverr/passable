import { lorem } from 'faker';
import { expect } from 'chai';
import Passable from '.';
import passable from '../..';

const p = () => passable(lorem.word(), (test) => {
    test('f1', 'should someting', new Promise((resolve) => setTimeout(resolve, 250)));

    test('f1', 'should someting1', new Promise((resolve) => setTimeout(resolve, 2500)));
});

describe('Test async-done behavior', () => {
    it('Should something', () => {
        p()
    });
});