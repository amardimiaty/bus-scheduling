// Packages
import React from 'react'
import wait from 'waait'
import { mount } from 'enzyme'
import toJSON from 'enzyme-to-json'

// Context
import { ScheduleProvider } from '../../Schedule'

// Components
import Bus from '../index'

const fakeTrips = [
  { 'id': 1, 'startTime': 30, 'endTime': 150 }
]

const fakeContext = {
  schedule : [
    { 'id': 1, 'startTime': 30, 'endTime': 150 },
  ],
  selectedTrip: {},
  updateSelected: () => {},
  buses: [
    { number: 1, trips: [{ 'id': 1, 'startTime': 30, 'endTime': 150 }] }
  ],
  updateBuses: () => {},
}

describe('<Bus />', () => {
  it('renders and matches snapshot', async () => {
    const wrapper = mount(
      <ScheduleProvider value={fakeContext}>
        <Bus number={1} trips={fakeTrips} />
      </ScheduleProvider>
    )
    await wait()
    wrapper.update()
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('renders the correct bus number', async () => {
    const wrapper = mount(
      <ScheduleProvider value={fakeContext}>
        <Bus number={1} trips={fakeTrips} />
      </ScheduleProvider>
    )
    await wait()
    wrapper.update()
    const busNumber = wrapper.find('.Bus__number')
    expect(busNumber.text()).toContain('Bus 1');
  });
});