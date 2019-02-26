import {DataModels} from '@process-engine/consumer_api_contracts';
import {Component, State} from '@stencil/core';

import {IFormField} from './iform_field';
import {IKeyDownOnInputEvent} from './ikey_down_on_input_event';
import {NumberInputValidator} from './number_input_validator';

@Component({
  tag: 'number-form-field',
  styleUrl: 'number-form-field.css',
  shadow: false,
})
export class NumberFormField implements IFormField {

  @State() public value: number;

  public formField: DataModels.UserTasks.UserTaskFormField;
  public isValid: boolean = true;

  private _numberinputValidator: NumberInputValidator;

  constructor() {
    this._numberinputValidator = new NumberInputValidator(/^-?\d+(,|\.)\d+$/);
  }

  public get name(): string {
    return this.formField.id;
  }

  public componentWillLoad(): void {
    this.value = this.formField.defaultValue;
  }

  public render(): any {
    return <div class='form-group'>
              <label>{this.formField.label}</label>
              <input type='text' class='form-control' id={this.formField.id} name={this.formField.label}
                placeholder='0.0' value={this.value} pattern='^(-?\d+(,|\.)\d+)|(\d+)$'
                onKeyDown={(event: any): void => this._handleKeyDown(event)} onInput={(event: any): void => this._handleInput(event)}></input>
            </div>;
  }

  private _handleInput(event: IKeyDownOnInputEvent): void {
    const value: string = event.target.value;

    if (this._numberinputValidator.isValid(value)) {
      this.value = parseFloat(value.replace(',', '.'));
    } else {
      event.preventDefault();
    }
  }

  private _handleKeyDown(event: IKeyDownOnInputEvent): void {

    const isValidInput: boolean = this._numberinputValidator.validateKey(event);

    this.isValid = isValidInput;
    if (isValidInput) {
      return;
    }

    event.preventDefault();
  }
}
