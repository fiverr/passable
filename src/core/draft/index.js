import Context from '../Context';
import { ERROR_NO_CONTEXT } from './constants';

/**
 * @return {Object} Current draft.
 */
const draft = () => {

    if (Context.ctx) {
        return Context.ctx.result.output;
    }

    setTimeout(() => {
        throw new Error(ERROR_NO_CONTEXT);
    });
};

export default draft;
