import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach } from 'vitest';
import appOptions from '../scripts/app.js';

const TestComponent = {
  ...appOptions,
  template: `
    <div>
      <input v-model="menu" />
      <button @click="menuCheck">Check</button>
      <div class="message" :style="{'color': fontColor}">{{ message }}</div>
    </div>
  `
};

describe('LunchCheck', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(TestComponent);
  });

  it('未入力でボタンを押すとエラーメッセージが表示される', async () => {
    await wrapper.find('button').trigger('click');
    expect(wrapper.find('.message').text()).toBe('Please enter data first');
    expect(wrapper.vm.fontColor).toBe('#FF0000');
  });

  it('空白のみの入力はエラーとして扱われる', async () => {
    await wrapper.find('input').setValue('   ');
    await wrapper.find('button').trigger('click');
    expect(wrapper.find('.message').text()).toBe('Please enter data first');
    expect(wrapper.vm.fontColor).toBe('#FF0000');
  });

  it('1品はEnjoy!と表示される', async () => {
    await wrapper.find('input').setValue('sushi');
    await wrapper.find('button').trigger('click');
    expect(wrapper.find('.message').text()).toBe('Enjoy!');
    expect(wrapper.vm.fontColor).toBe('#00FF00');
  });

  it('3品はEnjoy!と表示される', async () => {
    await wrapper.find('input').setValue('sushi, ramen, pizza');
    await wrapper.find('button').trigger('click');
    expect(wrapper.find('.message').text()).toBe('Enjoy!');
  });

  it('4品はToo much!と表示される', async () => {
    await wrapper.find('input').setValue('sushi, ramen, pizza, salad');
    await wrapper.find('button').trigger('click');
    expect(wrapper.find('.message').text()).toBe('Too much!');
    expect(wrapper.vm.fontColor).toBe('#00FF00');
  });

  it('連続カンマの空要素はカウントしない', async () => {
    await wrapper.find('input').setValue('sushi,,ramen');
    await wrapper.find('button').trigger('click');
    expect(wrapper.find('.message').text()).toBe('Enjoy!');
  });

  it('スペースのみの要素はカウントしない', async () => {
    await wrapper.find('input').setValue('sushi, , ramen');
    await wrapper.find('button').trigger('click');
    expect(wrapper.find('.message').text()).toBe('Enjoy!');
  });
});
