export class ErrorMessage {
  constructor(
    public forControl: string,
    public forValidator: string,
    public text: string
  ) { }
}

export const DiscountErrorMessages = [
  new ErrorMessage('name', 'required', 'Please enter a discount setting name'),
  new ErrorMessage('ruleSetting', 'required', 'Please enter rule parameters'),
  new ErrorMessage('actionSetting', 'required', 'Please enter action parameters'),
];
