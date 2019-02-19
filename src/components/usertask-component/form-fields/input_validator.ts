export class InputValidator {
  private readonly _regex: RegExp;

  constructor(regex: string) {
    this._regex = new RegExp(regex);
  }

  public isValid(value: string): boolean {
    return this._regex.test(value);
  }

  public shouldValidateKey(keyCode: number, value?: string): boolean {
    const keyCodeDigitOne: number = 49;

    return keyCode >= keyCodeDigitOne;
  }

}
