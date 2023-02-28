import { createTest, destroyVM } from '../util';
import Scatter from 'packages/scatter';

describe('Scatter', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(Scatter, true);
    expect(vm.$el).to.exist;
  });
});

