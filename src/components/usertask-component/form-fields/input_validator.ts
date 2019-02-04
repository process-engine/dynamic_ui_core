export class InputValidator {
  private readonly regex: RegExp;

  constructor(regex: string) {
    this.regex = new RegExp(regex);
  }

  public isValid(value: string): boolean {
    return this.regex.test(value);
  }

  public shouldValidateKey(keyCode: number): boolean {
    const keyCodeDigitOne: number = 49;

    return keyCode >= keyCodeDigitOne;
  }
}
