export interface ProductForUpdate {
  name?: string,
  description?: string,
  price: number,
  downloadLink: string,
  imageSrc: string
  concurrencyToken?: string
}
