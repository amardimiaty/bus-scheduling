// Packages
import React, { useContext } from 'react'

// Utils
import formatTime from '../../utils/formatTime'

// Context
import { ScheduleContext } from '../Schedule'

// Styled Components
import BusWrapper from './BusWrapper'

// Components
import Trip from '../Trip'

const Bus = ({ trips, number }) => {
  const context = useContext(ScheduleContext)

  const getTripToAdd = () => {
    return context.schedule.filter(trip => trip.id === context.selectedTrip.id)[0]
  }

  /**
   * Takes in a trip to add to bus, then checks for 
   * conflicts by seeing if the trips start or end time falls
   * within 
   * 
   * @param {Object} tripToAdd trip object with startTime, endTime.
   * 
   * @returns {Boolean}
   */
  const checkForConflict = (tripToAdd) => {
    const { startTime, endTime } = tripToAdd
    for (let i = 0; i < trips.length; i++) {
      if (startTime >= trips[i].startTime && startTime <= trips[i].endTime) {
        return true
      }
      if (endTime >= trips[i].startTime && endTime <= trips[i].endTime) {
        return true
      }
    }
    return false
  } 

  /**
   * Gets the selected trip checks for scheduling
   * conflict with bus we want to add it to.
   * 
   * @returns {(Boolean | Object)} 
   * false if there is a conflict, if not an updated bus obj
   */
  const updateBusWithNewTrip = () => {
    const tripToAdd = getTripToAdd()
    const hasConflict = checkForConflict(tripToAdd)
    if(hasConflict) {
      return false
    }
    // Sort trips by start time
    const newTrips = [...trips, tripToAdd].sort((a,b) => a.startTime - b.startTime)
    return { number, trips: newTrips }
  }

  /**
   * Removes the selected trip from the current bus and
   * then adds trip to new bus. Last remove buses with
   * no trips and reset the bus numbers.
   * 
   * @returns {Array} The updated buses array.
   */
  const getUpdatedBuses = () => {
    const updatedBus = updateBusWithNewTrip()

    if(updatedBus) {
      return context.buses.map(bus => {
        // remove from current bus
        if (context.selectedTrip.currentBus === bus.number) {
          const trips = bus.trips.filter(trip => trip.id !== context.selectedTrip.id)
          return bus = { number, trips: trips }
        }
        // update bus
        if (bus.number === number) {
          return bus = updatedBus
        }

        return bus

      }).filter(bus => bus.trips.length !== 0)
        .map((bus, idx) => {
          return {
            number: idx + 1,
            trips: bus.trips,
          }
        })
    } else {
      // Since there is a conflict remove the "New Bus" and alert
      alert('There is a scheduling conflict cannot add trip to bus.')
      return context.buses.slice(0, context.buses.length - 1)
    }
  }
  
  const handleBusClick = ({ target }) => {
    if(target.classList.contains('Bus')) {
      if(context.selectedTrip.id) {
        const sameBus = trips.filter(t => t.id === context.selectedTrip.id )
        if(!sameBus.length) {
          const updatedBuses = getUpdatedBuses()
          context.updateBuses(updatedBuses)
          context.updateSelected({})
        }
      }
    }
  }

  return (
      <BusWrapper className="Bus" onClick={(e) => handleBusClick(e)}>
        <div className="Bus__info">
          <span className="Bus__number">
            {typeof number === "number" ? `Bus ${number}` : 'New Bus'}
          </span>
          <span className="Bus__time">
            {
              trips.length ? (
                `${formatTime(trips[0].startTime)} 
                - 
                ${formatTime(trips[trips.length - 1].endTime)}`
              ) : null
            }
          </span>
        </div>
        {
          trips.map(trip => (
            <Trip key={`trip-${trip.id}`} trip={trip} busNumber={number} />
          ))
        }
      </BusWrapper>
  )
}

export default Bus