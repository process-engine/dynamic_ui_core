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

  public componentWillLoad(): void {
    this.value = '--.--.----';
  }

  public render(): any {
    return <div class='form-group'>
      <label htmlFor={this.formField.id}>{this.formField.label}</label>
      <input type='date' data-provide='datepicker' class='form-control'
        id={this.formField.id} value={this.value} onFocus={(event: any): void => this._handleChange(event)}></input>

    </div>;
  }

  private _handleChange(event: any): void {
    this.value = event.target.value;
  }
}
