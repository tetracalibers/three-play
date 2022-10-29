export const radians = (degrees: number) => {
  return (degrees * Math.PI) / 180
}

export const distance = (x1: number, y1: number, x2: number, y2: number) => {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
}

export const map = (
  value: number,
  start1: number,
  stop1: number,
  start2: number,
  stop2: number,
) => {
  return ((value - start1) / (stop1 - start1)) * (stop2 - start2) + start2
}
