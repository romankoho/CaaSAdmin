export interface ProductForUpdate {
  name?: string,
  description?: string,
  price: number,
  concurrencyToken?: string
}
