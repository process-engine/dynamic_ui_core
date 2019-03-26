import {IKeyDownOnInputEvent} from './ikey_down_on_input_event';
import {KeyCodes} from './key_codes';

export class DateInputValidator {

  public validateKey(event: IKeyDownOnInputEvent): boolean {

    const isEnterPressed: boolean = event.keyCode === KeyCodes.ENTER;
    const isBackspacePressed: boolean = event.keyCode === KeyCodes.BACKSPACE;
    const isDotPosition: boolean = event.target.value.length === 2 || event.target.value.length === 5;
    const isCopyPastePressed: boolean = this.isCopyAndPastePressed(event);
    const isValidKey: boolean = this.isKeyValid(event, isBackspacePressed, isCopyPastePressed);
    const isTabPressed: boolean = event.keyCode === KeyCodes.TAB;

    if (isTabPressed) {
      return true;
    }

    if (isEnterPressed) {
      return this.isValidDate(event.target.value);
    }

    if (isDotPosition) {

      if (isBackspacePressed) {
        return true;
      } else {
        event.target.value = event.target.value.concat('.');
      }
    }

    return isValidKey;
  }

  public isValidDate(value: string): boolean {
    const year: number = parseInt(value.substring(6, 10));
    const month: number = parseInt(value.substring(3, 5));
    const day: number = parseInt(value.substring(0, 2));

    return this.isDayInMonth(day, month, year);
  }

  private isDayInMonth(day: number, month: number, year: number): boolean {
    const numberOfDaysInSelectedMonth: number = new Date(year, month, 0).getDate();
    const isGivenDayInMonth: boolean = day <= numberOfDaysInSelectedMonth;

    return isGivenDayInMonth;
  }

  private isCopyAndPastePressed(event: IKeyDownOnInputEvent ): boolean {
    return (event.keyCode === KeyCodes.C || event.keyCode === KeyCodes.V) && (event.ctrlKey || event.metaKey);
  }

  private isKeyValid(event: IKeyDownOnInputEvent, isBackspacePressed: boolean, isCopyPastePressed: boolean): boolean {
    return (event.keyCode <= KeyCodes.NINE && event.keyCode >= KeyCodes.ZERO)
            || isBackspacePressed
            || isCopyPastePressed;
  }

}
