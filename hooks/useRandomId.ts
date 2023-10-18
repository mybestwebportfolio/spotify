export const useRandomId = (originalId: string): string => {
  // Generate a random string with 11 digits
  const randomPart = Math.random().toString().substr(2, 11)

  // Concatenate the original character and the random string
  return originalId + randomPart
}
