import {InputValidator} from './input_validator';

export class NumberInputValidator extends InputValidator {

  constructor(regex: string) {
    super(regex);
  }

  public isValid(value: string): boolean {
    return super.isValid(value);
  }

  public validateKey(keyCode: number): boolean {
    const keyCodeDigitOne: number = 49;

    const isValidKey: boolean = keyCode >= keyCodeDigitOne;

    return isValidKey;
  }

}
