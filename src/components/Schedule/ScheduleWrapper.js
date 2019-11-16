// Packages
import styled from 'styled-components'


const ScheduleWrapper = styled.div`
  font-family: 'Lato';
  padding-top: 48px;
  width: 725px;
  margin: 0 auto;
  border-bottom: 1px solid #BDBDBD;
  .Schedule__operating-hrs {
    position: relative;
    left: 140px;
    font-size: 12px;
    margin-bottom: 12px;
    span {
      display: inline-block;
      width: 25px;
    }
    span:not(:first-child) {
      // Need to figure out better way to derive this #
      margin-left: 33px;
    }
  }
`

export default ScheduleWrapper