import {DataModels} from '@process-engine/consumer_api_contracts';
import {Component, State} from '@stencil/core';

import {IFormField} from './iform_field';
import {NumberInputValidator} from './number_input_validator';

@Component({
  tag: 'number-form-field',
  styleUrl: 'number-form-field.css',
  shadow: false,
})
export class NumberFormField implements IFormField {

  @State() public value: number;

  public formField: DataModels.UserTasks.UserTaskFormField;

  private readonly _inputValidator: NumberInputValidator;

  constructor() {
    const validatorRegex: string = '^-?\\d*\\,?\\d*$';
    this._inputValidator = new NumberInputValidator(validatorRegex);
  }

  public get name(): string {
    return this.formField.id;
  }

  public componentWillLoad(): void {
    this.value = this.formField.defaultValue;
  }

  public render(): any {
    return (
      <div class='form-group'>
        <label>{this.formField.label}</label>
        <input type='text' class='form-control' id={this.formField.id} name={this.formField.label} value={this.value}
          onKeyDown={(event: any): void => this._handleKeyDown(event)} onInput={(event: any): void => this._handleInput(event)}></input>
      </div>
    );
  }

  private _handleInput(event: any): void {
    const value: string = event.target.value;

    if (this._inputValidator.isValid(value)) {
      this.value = parseFloat(value.replace(',', '.'));
    } else {
      event.preventDefault();
    }
  }

  private _handleKeyDown(event: any): void {
    const value: string = this.value + event.key;

    const isNoValidInput: boolean = this._inputValidator.validateKey(event.keyCode) && !this._inputValidator.isValid(value);

    if (isNoValidInput) {
      event.preventDefault();
    }
  }
}
