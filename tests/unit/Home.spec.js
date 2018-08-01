import { shallowMount } from '@vue/test-utils';
import Home from '@/views/Home.vue';
import DeviceListScreen from '@/components/DeviceListScreen.vue';

describe('Home.vue', () => {
  it('renders the first screen', () => {
    const wrapper = shallowMount(Home);
    expect(wrapper.contains(DeviceListScreen)).toBe(true);
  });
});
