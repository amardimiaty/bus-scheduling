// Packages
import React, { useState, useEffect, createContext } from 'react'

// Data
import BusSchedule from '../../data/schedule.json'
import OperatingHrs from '../../data/operatingHours.json'

// Styled Components
import ScheduleWrapper from './ScheduleWrapper'

// Components
import Bus from '../Bus'

const ScheduleContext = createContext()
const ScheduleProvider = ScheduleContext.Provider

const Schedule = () => {
  const schedule = BusSchedule
  const operatingHours = OperatingHrs
  const [buses, updateBuses] = useState([])
  const [selectedTrip, updateSelected] = useState({})
  const [isNewBusShowing, updateIsNewBusShowing] = useState(false)

  /* eslint-disable */
  useEffect(() => {
    // Initial seeding.
    let busesToAdd = []
    schedule.map((trip, idx) => busesToAdd.push({number: idx + 1,  trips: [trip] }))
    updateBuses(busesToAdd)
  }, [])

  useEffect(() => {
    // If the selected trip changes and it is not empty show new bus.
    if(selectedTrip.id) {
      if(!isNewBusShowing) {
        const busesWithNew = [...buses, { number: 'New Bus', trips: [] }]
        updateBuses(busesWithNew)
        updateIsNewBusShowing(true)
      }
    } else {
      updateIsNewBusShowing(false)
    }
  }, [selectedTrip])
/* eslint-enable */

  return (
    <ScheduleProvider value={{
      schedule,
      selectedTrip, 
      updateSelected,
      buses,
      updateBuses,
    }}>
      <ScheduleWrapper>
        <div className="Schedule__operating-hrs">
          {
            operatingHours.map(h => (<span key={h}>{h}</span>))
          }
        </div>
        {
          buses.map((bus, idx) => (
            <Bus key={`bus-${idx + 1}`} trips={bus.trips} number={bus.number}/>
          ))
        }
      </ScheduleWrapper>
    </ScheduleProvider>
  )
}

export default Schedule
export { ScheduleContext, ScheduleProvider }