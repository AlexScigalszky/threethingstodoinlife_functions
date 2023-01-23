const SIZE = 16
const MAX_NUMBER = 0x1_00_00
export const generateUniqueId = function () {
  return Math.floor((1 + Math.random()) * MAX_NUMBER)
    .toString(SIZE)
    .slice(1)
}
