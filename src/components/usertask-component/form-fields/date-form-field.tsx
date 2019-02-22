import {DataModels} from '@process-engine/consumer_api_contracts';
import {Component, State} from '@stencil/core';

import {DateInputValidator} from './date_input_validator';
import {IFormField} from './iform_field';

@Component({
  tag: 'date-form-field',
  styleUrl: 'date-form-field.css',
  shadow: true,
})
export class DateFormField implements IFormField {

  @State() public value: string;

  public formField: DataModels.UserTasks.UserTaskFormField;

  private readonly _inputValidator: DateInputValidator;

  constructor() {
    const validatorRegex: string = `/^\s*(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\.((?:19|20)\d{2})\s*$/`;
    this._inputValidator = new DateInputValidator(validatorRegex);
  }

  public get name(): string {
    return this.formField.id;
  }

  public componentWillLoad(): void {
    this.value = this.formField.defaultValue;
  }

  public render(): any {
    return (
      <div class= 'form-group'>
        <label htmlFor={this.formField.id}>{this.formField.label}</label>
        <input type='text' data-provide='datepicker' class='form-control' maxlength='10' placeholder='--.--.----'
          id={this.formField.id} value={this.value} onFocus={(event: any): void => this._handleChange(event)}
          onKeyDown={(event: any): void => this._handleKeyDown(event)}></input>

      </div>
    );
  }

  private _handleChange(event: any): void {
    this.value = event.target.value;
  }

  private _handleKeyDown(event: any): void {
    const value: string = this.value + event.key;

    const isValidInput: boolean = (!this._inputValidator.validateKey(event.keyCode, event.target.value) && !this._inputValidator.isValid(value));

    if (isValidInput) {
      event.preventDefault();
    }
  }
}
