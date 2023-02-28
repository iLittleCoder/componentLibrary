import { createTest, destroyVM } from '../util';
import Chart from 'packages/chart';

describe('Chart', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(Chart, true);
    expect(vm.$el).to.exist;
  });
});

