import { singleton } from '../../lib';
import { ERROR_NO_CONTEXT } from './constants';

/**
 * @return {Object} Current draft.
 */
const draft = () => {

    const ctx = singleton.use().ctx;

    if (ctx) {
        return ctx.result.output;
    }

    setTimeout(() => {
        throw new Error(ERROR_NO_CONTEXT);
    });
};

export default draft;
