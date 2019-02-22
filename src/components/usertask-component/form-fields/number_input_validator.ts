import {KeyCodes} from './key_codes';

export class NumberInputValidator {
  private readonly _regex: RegExp;

  constructor(regex: RegExp) {
    this._regex = new RegExp(regex);
  }

  public isValid(value: string): boolean {
    return this._regex.test(value);
  }

  public validateKey(keyCode: number): boolean {
    const isEnterPressed: boolean = keyCode === KeyCodes.ENTER;
    const isBackspacePressed: boolean = keyCode === KeyCodes.BACKSPACE;
    const isKeyCommaPressed: boolean = keyCode === KeyCodes.COMMA;
    const isKeyDotPressed: boolean = keyCode === KeyCodes.DOT;
    const isValidKey: boolean = (keyCode <= KeyCodes.NINE && keyCode >= KeyCodes.ZERO)
                                || isBackspacePressed
                                || isEnterPressed
                                || isKeyCommaPressed
                                || isKeyDotPressed;

    return isValidKey;
  }

}
