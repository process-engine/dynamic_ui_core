import {DataModels} from '@process-engine/consumer_api_contracts';
import {Component, State} from '@stencil/core';

import {IFormField} from './iform_field';
import {InputValidator} from './input_validator';

@Component({
  tag: 'date-form-field',
  styleUrl: 'date-form-field.css',
  shadow: true,
})
export class DateFormField implements IFormField {

  @State() public value: string;

  public formField: DataModels.UserTasks.UserTaskFormField;

  public get name(): string {
    return this.formField.id;
  }

  private readonly _inputValidator: InputValidator = new InputValidator('/^\s*(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\.(20\d{2})\s*$/g');
  // new InputValidator('(3[01]|[12][0-9]|0?[1-9]).(1[012]|0?[1-9]).(20\d{2}\s*$');

  public public; public componentWillLoad(): void {
    this.value = this.formField.defaultValue;
  }

  public render(): any {
    return <div class='form-group'>
      <label htmlFor={this.formField.id}>{this.formField.label}</label>
      <input type='text' data-provide='datepicker' class='form-control'
        id={this.formField.id} value={this.value} onFocus={(event: any): void => this._handleChange(event)}
        onKeyDown={(event: any): void => this._handleKeyDown(event)} onInput={(event: any): void => this._handleInput(event)}></input>

    </div>;
  }

  private _handleInput(event: any): void {
    const value: string = event.target.value;

    if (this._inputValidator.isValid(value)) {
      // this.value = parseFloat(value.replace(',', '.'));
    } else {
      event.preventDefault();
    }
  }

  private _handleKeyDown(event: any): void {
    const value: string = this.value + event.key;

    if (this._inputValidator.shouldValidateKey(event.keyCode) && !this._inputValidator.isValid(value)) {
      event.preventDefault();
    }
  }

  private _handleChange(event: any): void {
    this.value = event.target.value;
  }
}
