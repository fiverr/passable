import { expect } from 'chai';
import dist from '../../../dist/Passable.min';
import dev from '../../Passable';
import usecase_a from './usecase_a';
import usecase_b from './usecase_b';
import usecase_c from './usecase_c';
import usecase_d from './usecase_d';

describe('Test Passable full usecase', () => {

    describe('usecase_a', () => {
        const devData = usecase_a(dev),
            distData = usecase_a(dist);

        it('Test source', () => { expect(devData.response).to.deep.equal(devData.expect); });
        it('Test Dist', () => { expect(distData.response).to.deep.equal(devData.expect); });
    });

    describe('usecase_b', () => {
        const devData = usecase_b(dev),
            distData = usecase_b(dist);

        it('Test source', () => { expect(devData.response).to.deep.equal(devData.expect); });
        it('Test Dist', () => { expect(distData.response).to.deep.equal(devData.expect); });
    });

    describe('usecase_c', () => {
        const devData = usecase_c(dev),
            distData = usecase_c(dist);

        it('Test source', () => { expect(devData.response).to.deep.equal(devData.expect); });
        it('Test Dist', () => { expect(distData.response).to.deep.equal(devData.expect); });
    });

    describe('usecase_d', () => {
        const devData = usecase_d(dev),
            distData = usecase_d(dist);

        it('Test source', () => { expect(devData.response).to.deep.equal(devData.expect); });
        it('Test Dist', () => { expect(distData.response).to.deep.equal(devData.expect); });
    });

});