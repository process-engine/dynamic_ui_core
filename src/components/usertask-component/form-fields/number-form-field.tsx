import {DataModels} from '@process-engine/consumer_api_contracts';
import {
  Component, JSX, Prop, State, h,
} from '@stencil/core';

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

  @Prop() public formField: DataModels.UserTasks.UserTaskFormField;
  public isValid: boolean = true;

  private numberinputValidator: NumberInputValidator;
  private readonly validationRegex: string = '^(-?\\d+(,|\\.)\\d+)|(-?\\d+)$';

  constructor() {
    this.numberinputValidator = new NumberInputValidator(this.validationRegex);
  }

  public get name(): string {
    return this.formField.id;
  }

  public componentWillLoad(): void {
    const formFieldDefaultValue = this.formField.defaultValue;
    const parsedDefaultValue = parseFloat(formFieldDefaultValue.replace(',', '.'));

    // eslint-disable-next-line no-restricted-globals
    this.value = isNaN(parsedDefaultValue) ? formFieldDefaultValue : parsedDefaultValue;
  }

  public render(): JSX.Element {
    return <div class='form-group'>
      <label>{this.formField.label}</label>
      <input type='text' class='form-control' id={this.formField.id} name={this.formField.label}
        placeholder='0.0' value={this.value} pattern={this.validationRegex}
        onKeyDown={(event: IKeyDownOnInputEvent): void => this.handleKeyDown(event)}
        onInput={(event: IKeyDownOnInputEvent): void => this.handleInput(event)}
        onChange={(event: IKeyDownOnInputEvent): void => this.handleChange(event)}>
      </input>
    </div>;
  }

  private handleChange(event: IKeyDownOnInputEvent): void {
    this.isValid = this.numberinputValidator.isValid(event.target.value);
    this.setStyle(event);
  }

  private handleInput(event: IKeyDownOnInputEvent): void {
    const value: string = event.target.value;

    if (this.numberinputValidator.isValid(value)) {
      this.value = parseFloat(value.replace(',', '.'));
    } else {
      event.preventDefault();
    }
  }

  private setStyle(event: IKeyDownOnInputEvent): void {
    const isEmptyInput: boolean = event.target.value.length === 0;

    // eslint-disable-next-line no-undef
    const element: HTMLElement = document.getElementById(this.formField.id);
    element.style.borderColor = (this.isValid || isEmptyInput) ? '' : 'red';

    if (isEmptyInput) {
      this.isValid = true;
    }
  }

  private handleKeyDown(event: IKeyDownOnInputEvent): void {
    const isValidInput: boolean = this.numberinputValidator.validateKey(event);

    if (isValidInput) {
      return;
    }

    event.preventDefault();
  }

}
