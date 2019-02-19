import { InputValidator } from './input_validator';

export class NumberInputValidator extends InputValidator {

  constructor(regex: string) {
    super(regex);
  }

  public isValid(value: string): boolean {
    return super.isValid(value);
  }

  public shouldValidateKey(keyCode: number): boolean {
    const keyCodeDigitOne: number = 49;

    return keyCode >= keyCodeDigitOne;
  }

}
