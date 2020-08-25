import {DataModels} from '@process-engine/consumer_api_contracts';
import {
  Component, JSX, Prop, State, h,
} from '@stencil/core';

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

  @Prop() public formField: DataModels.UserTasks.UserTaskFormField;
  public isValid: boolean = true;

  private readonly inputValidator: DateInputValidator;
  private readonly validationRegex: string =
  '^(0?[1-9]|[12][0-9]|3[01])([ \\.])(0?[1-9]|1[012])\\2([0-9][0-9][0-9][0-9])(([ -])([0-1]?[0-9]|2[0-3]):[0-5]?[0-9]:[0-5]?[0-9])?$';

  constructor() {
    this.inputValidator = new DateInputValidator();
  }

  public get name(): string {
    return this.formField.id;
  }

  public componentWillLoad(): void {
    this.value = this.formField.defaultValue;
  }

  public render(): JSX.Element {
    return <div class= 'form-group'>
      <label htmlFor={this.formField.id}>{this.formField.label}</label>
      <input type='text' data-provide='datepicker' class='form-control' maxlength='10' placeholder='--.--.----'
        pattern={this.validationRegex}
        id={this.formField.id} value={this.value} onChange={(event: IKeyDownOnInputEvent): void => this.handleChange(event)}
        onKeyDown={(event: IKeyDownOnInputEvent): void => this.handleKeyDown(event)}>
      </input>
    </div>;
  }

  private handleChange(event: IKeyDownOnInputEvent): void {
    this.value = event.target.value;
    this.isValid = this.inputValidator.isValidDate(event.target.value);
    this.setStyle(event);
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
    const isValidInput: boolean = this.inputValidator.validateKey(event);

    if (isValidInput) {
      return;
    }

    event.preventDefault();
  }

}
