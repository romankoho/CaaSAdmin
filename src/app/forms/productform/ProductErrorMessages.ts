export class ErrorMessage {
  constructor(
    public forControl: string,
    public forValidator: string,
    public text: string
  ) { }
}

export const ProductErrorMessages = [
  new ErrorMessage('name', 'required', 'Please enter a name'),
  new ErrorMessage('price', 'required', 'Please enter a price'),
  new ErrorMessage('price', 'min', 'The price must be at least 0.01'),
  new ErrorMessage('price', 'max', 'The price can be maximum 999 999'),

];
