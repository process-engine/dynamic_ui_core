export class NumberInputValidator {
  private readonly _regex: RegExp;

  constructor(regex: RegExp) {
    this._regex = new RegExp(regex);
  }

  public isValid(value: string): boolean {
    return this._regex.test(value);
  }

  public validateKey(keyCode: number): boolean {
    const keyCodeDigitOne: number = 49;

    const isValidKey: boolean = keyCode >= keyCodeDigitOne;

    return isValidKey;
  }

}
