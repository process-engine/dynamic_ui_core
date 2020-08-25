import {DataModels} from '@process-engine/consumer_api_contracts';
import {Component, State} from '@stencil/core';

import {DateInputValidator} from './date_input_validator';
import {IFormField} from './iform_field';
import {IKeyDownOnInputEvent} from './ikey_down_on_input_event';

@Component({
  tag: 'date-form-field',
  styleUrl: 'date-form-field.css',
  shadow: true,
})
export class DateFormField implements IFormField {

  @State() public value: string;

  public formField: DataModels.UserTasks.UserTaskFormField;
  public isValid: boolean = true;

  private readonly _inputValidator: DateInputValidator;
  private readonly validationRegex: string =
    `^(0?[1-9]|[12][0-9]|3[01])([ \\.])(0?[1-9]|1[012])\\2([0-9][0-9][0-9][0-9])(([ -])([0-1]?[0-9]|2[0-3]):[0-5]?[0-9]:[0-5]?[0-9])?$`;

  constructor() {
    this._inputValidator = new DateInputValidator();
  }

  public get name(): string {
    return this.formField.id;
  }

  public componentWillLoad(): void {
    this.value = this.formField.defaultValue;
  }

  public render(): any {
    return <div class= 'form-group'>
            <label htmlFor={this.formField.id}>{this.formField.label}</label>
            <input type='text' data-provide='datepicker' class='form-control' maxlength='10' placeholder='--.--.----'
             pattern={this.validationRegex}
             id={this.formField.id} value={this.value} onChange={(event: IKeyDownOnInputEvent): void => this._handleChange(event)}
             onKeyDown={(event: IKeyDownOnInputEvent): void => this._handleKeyDown(event)}>
            </input>
          </div>;
  }

  private _handleChange(event: IKeyDownOnInputEvent): void {
    this.value = event.target.value;
  }

  private _setStyle(event: IKeyDownOnInputEvent): void {
    const isEmptyInput: boolean = event.target.value.length === 0;

    const element: HTMLElement = document.getElementById(this.formField.id);
    element.style.borderColor = (this.isValid || isEmptyInput) ? '' : 'red';

    if (isEmptyInput) {
      this.isValid = true;
    }
  }

  private _handleKeyDown(event: IKeyDownOnInputEvent): void {
    this.isValid = this._inputValidator.isValidDate(event.target.value);
    this._setStyle(event);

    const isValidInput: boolean = this._inputValidator.validateKey(event);

    if (isValidInput) {
      return;
    }

    event.preventDefault();
  }
}
