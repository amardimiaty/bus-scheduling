// Packages
import styled from 'styled-components'

const TripWrapper = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  height: 30px;
  border: 1px solid #9E9E9E;
  width: ${props => props.endTime - props.startTime}px;
  left: ${props => props.startTime + 140}px;
  background-color: ${props => props.isSelected ? '#EFFAFF' : 'white'};
  cursor: pointer;
`

export default TripWrapper