// packages
import styled from 'styled-components'

const BusWrapper = styled.div`
  position: relative;
  border-top: 1px solid #BDBDBD;
  height: 50px;
  cursor: pointer;

  .Bus__info {
    width: 140px;
    border-right: 1px solid #BDBDBD;
  }
  
  .Bus__number {
    display: inline-block;
    line-height: 50px;
    padding: 0 20px;
    font-weight: 600;
  }

  .Bus__time {
    font-size: 10px;
    font-weight: 400;
    color: #9E9E9E;
  }

  &:nth-child(odd) {
    background-color:#F5F5F5;
  }
`
export default BusWrapper