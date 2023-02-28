import { createTest, destroyVM } from '../util';
import Line from 'packages/line';

describe('Line', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(Line, true);
    expect(vm.$el).to.exist;
  });
});

