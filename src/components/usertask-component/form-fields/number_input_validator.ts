export class NumberInputValidator {
  private readonly _regex: RegExp;

  constructor(regex: RegExp) {
    this._regex = new RegExp(regex);
  }

  public isValid(value: string): boolean {
    return this._regex.test(value);
  }

  public validateKey(keyCode: number): boolean {
    const keyCodeBackspace: number = 8;
    const keyCodeDigitZero: number = 48;
    const keyCodeDigitNine: number = 57;
    const keyCodeEnter: number = 13;
    const keyCodeComma: number = 188;
    const keyCodeDigitDot: number = 190;

    const isEnterPressed: boolean = keyCode === keyCodeEnter;
    const isBackspacePressed: boolean = keyCode === keyCodeBackspace;
    const isKeyCommaPressed: boolean = keyCode === keyCodeComma;
    const isKeyDotPressed: boolean = keyCode === keyCodeDigitDot;
    const isValidKey: boolean = (keyCode <= keyCodeDigitNine && keyCode >= keyCodeDigitZero)
                                || isBackspacePressed
                                || isEnterPressed
                                || isKeyCommaPressed
                                || isKeyDotPressed;

    return isValidKey;
  }

}
