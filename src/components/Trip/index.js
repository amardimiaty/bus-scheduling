// Packages
import React, { useContext } from 'react'

// Context
import { ScheduleContext } from '../Schedule'

// Styled Components
import TripWrapper from './TripWrapper'

const Trip = ({ trip, busNumber }) => {
  const {selectedTrip, updateSelected} = useContext(ScheduleContext)
  return (
    <TripWrapper
      isSelected={trip.id === selectedTrip.id}
      endTime={trip.endTime} 
      startTime={trip.startTime}
      onClick={() => updateSelected({ 
        id:trip.id, 
        currentBus: busNumber, 
        endTime: trip.endTime, 
        startTime: trip.startTime 
      })}>
        <span className="Trip__number">{trip.id}</span>
    </TripWrapper>
  )
}

export default Trip