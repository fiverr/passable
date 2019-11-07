import singleton from '../../lib/singleton';
import { ERROR_NO_CONTEXT } from './constants';

/**
 * @return {Object} Current draft.
 */
const draft = () => {

    const ctx = singleton.use().Context.ctx;

    if (ctx) {
        return ctx.result.output;
    }

    setTimeout(() => {
        throw new Error(ERROR_NO_CONTEXT);
    });
};

export default draft;
