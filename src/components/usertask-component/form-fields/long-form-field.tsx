import {DataModels} from '@process-engine/consumer_api_contracts';
import {Component, State} from '@stencil/core';

import {IFormField} from './iform_field';
import {InputValidator} from './input_validator';

@Component({
  tag: 'long-form-field',
  styleUrl: 'long-form-field.css',
  shadow: true,
})
export class LongFormField implements IFormField {

  @State() public value: string;

  public formField: DataModels.UserTasks.UserTaskFormField;

  public get name(): string {
    return this.formField.id;
  }

  private readonly _inputValidator: InputValidator = new InputValidator('^\\d+$');

  public componentWillLoad(): void {
    this.value = this.formField.defaultValue;
  }

  public render(): any {
    return (
      <div class='form-group'>
        <label htmlFor={this.formField.id}>{this.formField.label}</label>
        <input type='text' class='form-control' id={this.formField.id} name={this.formField.label} value={this.value}
          onKeyDown={(event: any): void => this._handleKeyDown(event)} onInput={(event: any): void => this._handleInput(event)}></input>
      </div>
    );
  }

  private _handleInput(event: any): void {
    const value: string = event.target.value;

    if (this._inputValidator.isValid(value)) {
      this.value = value;
    }
  }

  private _handleKeyDown(event: any): void {
    const value: string = (this.value) ? this.value + event.key : event.key;

    if (this._inputValidator.shouldValidateKey(event.keyCode) && !this._inputValidator.isValid(value)) {
      event.preventDefault();
    }
  }
}
