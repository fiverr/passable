import { expect } from 'chai';
import dist, * as distExports from '../../../dist/passable.min';
import dev, * as devExports from '../../index';
import usecase_a from './usecase_a';
import usecase_b from './usecase_b';
import usecase_c from './usecase_c';
import usecase_d from './usecase_d';

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

    it('should return correct response object for case: d', () => {
        const devData = usecase_d(dev, devExports.enforce),
            distData = usecase_d(dist, distExports.enforce);

        expect(devData.response).to.deep.equal(devData.expect);
        expect(distData.response).to.deep.equal(devData.expect);
    });
});