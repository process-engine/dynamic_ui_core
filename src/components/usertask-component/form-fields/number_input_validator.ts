import {IKeyDownOnInputEvent} from './ikey_down_on_input_event';
import {KeyCodes} from './key_codes';

export class NumberInputValidator {
  private readonly _regex: RegExp;

  constructor(regex: string) {
    this._regex = new RegExp(regex);
  }

  public isValid(value: string): boolean {
    return this._regex.test(value);
  }

  public validateKey(event: IKeyDownOnInputEvent): boolean {

    const keyCode: number = event.keyCode;
    const isCTRLPressed: boolean = event.ctrlKey;
    const isCommandPressed: boolean = event.metaKey;

    const isEnterPressed: boolean = keyCode === KeyCodes.ENTER;
    const isBackspacePressed: boolean = keyCode === KeyCodes.BACKSPACE;
    const isKeyCommaPressed: boolean = keyCode === KeyCodes.COMMA;
    const isKeyDotPressed: boolean = keyCode === KeyCodes.DOT;
    const isMinusKeyPressd: boolean = keyCode === KeyCodes.MINUS;
    const isCopyPastePressed: boolean = (keyCode === KeyCodes.C || keyCode === KeyCodes.V) && (isCTRLPressed || isCommandPressed);
    const isValidKey: boolean = (keyCode <= KeyCodes.NINE && keyCode >= KeyCodes.ZERO)
                                || isBackspacePressed
                                || isEnterPressed
                                || isKeyCommaPressed
                                || isKeyDotPressed
                                || isCopyPastePressed
                                || isMinusKeyPressd;

    return isValidKey;
  }

}
