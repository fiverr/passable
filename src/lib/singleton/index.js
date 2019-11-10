import go from '../globalObject';
import { SYMBOL_PASSABLE } from './constants';

/**
 * @param  {String[]} versions List of passable versions.
 * @throws {Error}
 */
const throwMultiplePassableError = (...versions) => {
    throw new Error(`[Passable]: Multiple versions of Passable detected: (${versions.join()}).
    Most features should work regularly, but for optimal feature compatibility, you should have all running instances use the same version.`);
};

/**
 * Registers current Passable instance on global object.
 * @param {Function} passable Reference to passable.
 * @return {Function} Global passable reference.
 */
const register = (passable) => {

    const existing = go[SYMBOL_PASSABLE];

    if (existing) {
        if (existing.VERSION !== passable.VERSION) {
            setTimeout(() => throwMultiplePassableError(passable.VERSION, existing.VERSION));
        }
    } else {
        go[SYMBOL_PASSABLE] = passable;
    }

    return go[SYMBOL_PASSABLE];
};

const singletonExport = {
    use: () => go[SYMBOL_PASSABLE],
    register
};

export default singletonExport;
