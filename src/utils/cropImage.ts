export async function getCroppedImg(
  imageSrc: string,
  crop: { x: number; y: number },
  zoom: number,
  croppedAreaPixels: any
): Promise<string> {
  const image = await createImage(imageSrc)
  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")

  canvas.width = croppedAreaPixels.width
  canvas.height = croppedAreaPixels.height

  ctx?.drawImage(
    image,
    croppedAreaPixels.x,
    croppedAreaPixels.y,
    croppedAreaPixels.width,
    croppedAreaPixels.height,
    0,
    0,
    croppedAreaPixels.width,
    croppedAreaPixels.height
  )

  return canvas.toDataURL("image/jpeg")
}

function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.addEventListener("load", () => resolve(image))
    image.addEventListener("error", (error) => reject(error))
    image.src = url
  })
}