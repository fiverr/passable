'use strict';

import passable from '../index.js';
import { expect } from 'chai';
import { version } from '../../package.json';

describe('Test passable\'s api misc features ', () => {
    it('Should output correct version number', () => {
        expect(passable.VERSION).to.equal(version);
    });
});