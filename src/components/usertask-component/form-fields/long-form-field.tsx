import {DataModels} from '@process-engine/consumer_api_contracts';
import {Component, State} from '@stencil/core';

import {IFormField} from './iform_field';
import {NumberInputValidator} from './number_input_validator';

@Component({
  tag: 'long-form-field',
  styleUrl: 'long-form-field.css',
  shadow: true,
})
export class LongFormField implements IFormField {

  @State() public value: number;

  public formField: DataModels.UserTasks.UserTaskFormField;

  private _numberinputValidator: NumberInputValidator;

  constructor() {
    this._numberinputValidator = new NumberInputValidator(/^\d+$/);
  }

  public get name(): string {
    return this.formField.id;
  }

  public componentWillLoad(): void {
    this.value = this.formField.defaultValue;
  }

  public render(): any {
    return <div class='form-group'>
              <label htmlFor={this.formField.id}>{this.formField.label}</label>
              <input type='text' class='form-control' id={this.formField.id} name={this.formField.label} value={this.value}
                placeholder='0' pattern='^\d+$'
                onKeyUp={(event: any): void => this._handleKeyDown(event)} onInput={(event: any): void => this._handleInput(event)}></input>
            </div>;
  }

  private _handleInput(event: any): void {
    const value: string = event.target.value;

    if (this._numberinputValidator.isValid(value)) {
      this.value = parseInt(value);
    }
  }

  private _handleKeyDown(event: any): void {
    const isValidInput: boolean = this._numberinputValidator.validateKey(event.keyCode);

    if (isValidInput) {
      return;
    }

    event.preventDefault();
  }
}
