// Packages
import React from 'react'
import wait from 'waait'
import { mount } from 'enzyme'
import toJSON from 'enzyme-to-json'

// Context
import { ScheduleProvider } from '../../Schedule'

// Components
import Trip from '../index'

const fakeTrip = {
 'id': 1, 
 'startTime': 30, 
 'endTime': 150
}

const fakeContext = {
  selectedTrip: {},
  update: () => {},
}

describe('<Trip />', () => {
  it('renders and matches snapshot', async () => {
    const wrapper = mount(
      <ScheduleProvider value={fakeContext}>
        <Trip busNumber={1} trip={fakeTrip} />
      </ScheduleProvider>
    )
    await wait()
    wrapper.update()
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('displays bus number', async () => {
    const wrapper = mount(
      <ScheduleProvider value={fakeContext}>
        <Trip busNumber={1} trip={fakeTrip} />
      </ScheduleProvider>
    )
    await wait()
    wrapper.update()
    const tripNumber = wrapper.find('.Trip__number')
    expect(tripNumber.text()).toContain('1');
  })
});