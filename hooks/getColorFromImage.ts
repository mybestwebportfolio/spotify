import Vibrant from 'node-vibrant'

export function getColorFromImage(imagePath: string) {
  const data = Vibrant.from(imagePath).getPalette((err, palette) => {
    return palette
  })
  return data
}
