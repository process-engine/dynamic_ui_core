export class InputValidator {
  private readonly _regex: RegExp;

  constructor(regex: string) {
    this._regex = new RegExp(regex);
  }

  public isValid(value: string): boolean {
    return this._regex.test(value);
  }

  public shouldValidateKey(keyCode: number): boolean {
    const keyCodeDigitOne: number = 49;

    return keyCode >= keyCodeDigitOne;
  }

  public shouldValidateKeyForDate(keyCode: number, value: string): boolean {
    const keyCodeDigitDot: number = 190;
    const keyCodeDigitZero: number = 48;
    const keyCodeDigitNine: number = 57;
    const keyCodeBackspace: number = 8;
    const keyCodeEnter: number = 13;

    if (keyCode === keyCodeEnter) {
      return this.isValid(value);
    }

    if (value.length === 2) {
      return keyCode === keyCodeDigitDot || keyCode === keyCodeBackspace;
    } else if (value.length === 5) {
      return keyCode === keyCodeDigitDot || keyCode === keyCodeBackspace;
    }

    return (keyCode <= keyCodeDigitNine && keyCode >= keyCodeDigitZero) || keyCode === keyCodeBackspace;
  }
}
