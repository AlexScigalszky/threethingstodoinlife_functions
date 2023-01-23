const SIZE = 16
const MAX_NUMBER = 36
export const generateUniqueId = function () {
  return Math.random().toString(MAX_NUMBER).slice(2, SIZE) + 
    Math.random().toString(MAX_NUMBER).slice(2, SIZE)
}
