import { createTest, createVue, destroyVM } from '../util';
import Switch from 'packages/switch';
import Vue from 'vue';

describe('Switch', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(Switch, {
      activeText: 'on',
      inactiveText: 'off',
      activeColor: '#0f0',
      inactiveColor: '#f00',
      width: 100
    });

    const core = vm.$el.querySelector('.el-switch__core');
    expect(core.style.backgroundColor).to.equal('rgb(255, 0, 0)');
    expect(core.style.width).to.equal('100px');
    expect(vm.$el.querySelector('.el-switch__label--left').querySelector('span').textContent).to.equal('off');
  });

  it('switch with icons', () => {
    vm = createTest(Switch, {
      activeIconClass: 'Gildata-tick',
      inactiveIconClass: 'el-icon-close'
    });

    const icon = vm.$el.querySelector('.el-switch__label--left').querySelector('i');
    expect(icon.classList.contains('el-icon-close')).to.true;
  });

  it('value correctly update', done => {
    vm = createVue({
      template: `
        <div>
          <el-switch
            v-model="value"
            activeColor="#0f0"
            inactiveColor="#f00">
          </el-switch>
        </div>
      `,

      data() {
        return {
          value: true
        };
      }
    }, true);

    const core = vm.$el.querySelector('.el-switch__core');
    expect(core.style.backgroundColor).to.equal('rgb(0, 255, 0)');
    core.click();
    setTimeout(() => {
      expect(core.style.backgroundColor).to.equal('rgb(255, 0, 0)');
      expect(vm.value).to.equal(false);
      core.click();
      setTimeout(() => {
        expect(vm.value).to.equal(true);
        done();
      }, 10);
    }, 10);
  });

  it('change event', done => {
    vm = createVue({
      template: `
        <div>
          <el-switch
            v-model="value"
            @change="handleChange">  
          </el-switch>
        </div>
      `,
      mounted() {
        setTimeout(() => {
          this.value = false;
        }, 10);
      },
      methods: {
        handleChange(val) {
          this.target = val;
        }
      },
      data() {
        return {
          target: 1,
          value: true
        };
      }
    }, true);

    setTimeout(() => {
      const core = vm.$el.querySelector('.el-switch__core');
      expect(vm.target).to.equal(1);
      core.click();
      setTimeout(() => {
        expect(vm.target).to.equal(true);
        done();
      }, 10);
    }, 50);
  });

  it('disabled switch should not respond to user click', done => {
    vm = createVue({
      template: `
        <div>
          <el-switch disabled v-model="value"></el-switch>
        </div>
      `,

      data() {
        return {
          value: true
        };
      }
    }, true);

    vm.$el.querySelector('.el-switch__core').click();
    Vue.nextTick(() => {
      expect(vm.value).to.true;
      done();
    });
  });

  it('expand switch value', done => {
    vm = createVue({
      template: `
        <div>
          <el-switch v-model="value" :active-value="onValue" :inactive-value="offValue"></el-switch>
        </div>
      `,
      data() {
        return {
          value: '100',
          onValue: '100',
          offValue: '0'
        };
      }
    }, true);

    const core = vm.$el.querySelector('.el-switch__core');
    core.click();
    setTimeout(() => {
      expect(vm.value).to.equal('0');
      core.click();
      setTimeout(() => {
        expect(vm.value).to.equal('100');
        done();
      }, 10);
    }, 10);
  });

  it('value is the single source of truth', done => {
    vm = createVue({
      template: `
        <div>
          <el-switch :value="true"></el-switch>
        </div>
      `
    }, true);

    const component = vm.$children[0];
    const input = vm.$el.querySelector('input');
    const core = vm.$el.querySelector('.el-switch__core');
    core.click();
    setTimeout(() => {
      expect(component.checked).to.equal(true);
      expect(component.$el.classList.contains('is-checked')).to.equal(true);
      expect(input.checked).to.equal(true);
      core.click();
      setTimeout(() => {
        expect(component.checked).to.equal(true);
        expect(component.$el.classList.contains('is-checked')).to.equal(true);
        expect(input.checked).to.equal(true);
        done();
      }, 10);
    }, 10);
  });

  it('sets checkbox value', done => {
    vm = createVue({
      template: `
        <div>
          <el-switch v-model="value"></el-switch>
        </div>
      `,
      data() {
        return {
          value: false
        };
      }
    }, true);

    vm.value = true;
    setTimeout(() => {
      expect(vm.$el.querySelector('input').checked).to.equal(true);
      vm.value = false;
      setTimeout(() => {
        expect(vm.$el.querySelector('input').checked).to.equal(false);
        done();
      }, 10);
    }, 10);
  });
});
