import {InputValidator} from './input_validator';

export class DateInputValidator extends InputValidator {

  constructor(regex: string) {
    super(regex);
  }

  public validateKey(keyCode: number, value: string): boolean {
    const keyCodeDigitDot: number = 190;
    const keyCodeDigitZero: number = 48;
    const keyCodeDigitNine: number = 57;
    const keyCodeBackspace: number = 8;
    const keyCodeEnter: number = 13;

    if (keyCode === keyCodeEnter) {
      return this.isValid(value) && this.isValidDate(value);
    }

    if (value.length === 2) {
      return keyCode === keyCodeDigitDot || keyCode === keyCodeBackspace;
    } else if (value.length === 5) {
      return keyCode === keyCodeDigitDot || keyCode === keyCodeBackspace;
    }

    return (keyCode <= keyCodeDigitNine && keyCode >= keyCodeDigitZero) || keyCode === keyCodeBackspace;
  }

  public isValidDate(value: string): boolean {
    const year: number = parseInt(value.substring(6, 10));
    const month: number = parseInt(value.substring(3, 5));
    const day: number = parseInt(value.substring(0, 2));

    return this.isDayInMonth(day, month, year);
  }

  private isDayInMonth(day: number, month: number, year: number): boolean {
    const numberOfDaysInSelectedMonth: number = new Date(year, month, 0).getDate();

    return day <= numberOfDaysInSelectedMonth;
  }

}
