import {IKeyDownOnInputEvent} from './ikey_down_on_input_event';

export class DateInputValidator {

  public validateKey(event: IKeyDownOnInputEvent): boolean {
    const keyCodeDigitDot: number = 190;
    const keyCodeDigitZero: number = 48;
    const keyCodeDigitNine: number = 57;
    const keyCodeBackspace: number = 8;
    const keyCodeEnter: number = 13;

    const isEnterPressed: boolean = event.keyCode === keyCodeEnter;
    const isBackspacePressed: boolean = event.keyCode === keyCodeBackspace;
    const isDotPosition: boolean = event.target.value.length === 2 || event.target.value.length === 5;
    const isValidKey: boolean = (event.keyCode <= keyCodeDigitNine && event.keyCode >= keyCodeDigitZero) || isBackspacePressed;
    const keyCodeIsDot: boolean = event.keyCode === keyCodeDigitDot;

    if (isEnterPressed) {
      return this.isValidDate(event.target.value);
    }

    if (isDotPosition) {

      if (keyCodeIsDot || isBackspacePressed) {
        return true;
      } else {
        return false;
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

}
