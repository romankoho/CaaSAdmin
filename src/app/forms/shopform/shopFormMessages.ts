export class ErrorMessage {
  constructor(
    public forControl: string,
    public forValidator: string,
    public text: string
  ) { }
}

export const ShopFormErrorMessages = [
  new ErrorMessage('name', 'required', 'Please enter a shop name'),
  new ErrorMessage('cartLifetime', 'required', 'Please enter cart lifetime'),
  new ErrorMessage('cartLifetime', 'min', 'Cart lifetime must be at least 60 minutes'),
  new ErrorMessage('cartLifetime', 'max', 'Cart lifetime can maximum be 9.999 minutes'),
  new ErrorMessage('appKey', 'required', 'Please enter an app key'),
  new ErrorMessage('appKey', 'minlength', 'App key needs to have at least 8 characters'),
];
