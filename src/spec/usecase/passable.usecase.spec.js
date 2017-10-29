import { expect } from 'chai';
import dist from '../../../dist/Passable.min';
import dev from '../../Passable';
import usecase_a from './usecase_a';
import usecase_b from './usecase_b';
import usecase_c from './usecase_c';

describe('Test Passable full usecase', () => {

    it('should return correct response object for case: a', () => {
        const devData = usecase_a(dev),
            distData = usecase_a(dist);

        expect(devData.response).to.deep.equal(devData.expect);
        expect(distData.response).to.deep.equal(devData.expect);
    });

    it('should return correct response object for case: b', () => {
        const devData = usecase_b(dev),
            distData = usecase_b(dist);

        expect(devData.response).to.deep.equal(devData.expect);
        expect(distData.response).to.deep.equal(devData.expect);
    });

    it('should return correct response object for case: c', () => {
        const devData = usecase_c(dev),
            distData = usecase_c(dist);

        expect(devData.response).to.deep.equal(devData.expect);
        expect(distData.response).to.deep.equal(devData.expect);
    });
});