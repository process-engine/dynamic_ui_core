import {DataModels} from '@process-engine/consumer_api_contracts';
import {Component, State} from '@stencil/core';

import {IFormField} from './iform_field';
import {IKeyDownOnInputEvent} from './ikey_down_on_input_event';
import {NumberInputValidator} from './number_input_validator';

@Component({
  tag: 'long-form-field',
  styleUrl: 'long-form-field.css',
  shadow: true,
})
export class LongFormField implements IFormField {

  @State() public value: number;

  public formField: DataModels.UserTasks.UserTaskFormField;
  public isValid: boolean = true;

  private _numberinputValidator: NumberInputValidator;
  private readonly validationRegex: string = '^\\d*$';

  constructor() {
    this._numberinputValidator = new NumberInputValidator(this.validationRegex);
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
                placeholder='0' pattern={this.validationRegex}
                onKeyDown={(event: IKeyDownOnInputEvent): void => this._handleKeyDown(event)}
                onInput={(event: IKeyDownOnInputEvent): void => this._handleInput(event)}
                onChange={(event: IKeyDownOnInputEvent): void => this._handleChange(event)}>
              </input>
            </div>;
  }

  private _handleChange(event: IKeyDownOnInputEvent): void {
    this.isValid = this._numberinputValidator.isValid(event.target.value);
    this._setStyle(event);
  }

  private _handleInput(event: IKeyDownOnInputEvent): void {
    const value: string = event.target.value;

    if (this._numberinputValidator.isValid(value)) {
      this.value = parseInt(value);
    } else {
      event.preventDefault();
    }
  }

  private _setStyle(event: IKeyDownOnInputEvent): void {
    const isEmptyInput: boolean = event.target.value.length === 0;

    const element: HTMLElement = document.getElementById(this.formField.id);
    element.style.borderColor = (this.isValid || isEmptyInput) ? '' : 'red';
    if (isEmptyInput) {
      this.isValid = true;
    }
  }

  private _handleKeyDown(event: any): void {
    const isValidInput: boolean = this._numberinputValidator.validateKey(event);

    if (isValidInput) {
      return;
    }

    event.preventDefault();
  }
}
