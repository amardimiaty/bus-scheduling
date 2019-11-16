const formatTime = (num) => {
  let hours = Math.floor(num / 60)
  let mins = num % 60;
  mins = mins === 0 ? '00' : mins
  return hours + ':' + mins
}

export default formatTime