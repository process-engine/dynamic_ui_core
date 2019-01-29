/* tslint:disable */
import {Component, State} from '@stencil/core';
import {DataModels} from '@process-engine/consumer_api_contracts';
import {IFormField} from './iform_field';

@Component({
  tag: 'date-form-field',
  styleUrl: 'date-form-field.css',
  shadow: true,
})

export class DateFormField implements IFormField {

  formField: DataModels.UserTasks.UserTaskFormField;

  public get name(): string {
    return this.formField.id;
  }

  @State() public value: string;

  // tslint:disable-next-line:typedef
  public componentWillLoad() {
    this.value = this.formField.defaultValue;
  }

  handleChange(event) {
    console.log(event.target.value);
    console.log(event);
    this.value = event.target.value;
  }

  render() {
    return <div class="form-group">
      <label htmlFor={this.formField.id}>{this.formField.label}</label>
      <input type="text" data-provide="datepicker" class="form-control" id={this.formField.id} value={this.value} onFocus={(event) => this.handleChange(event)} />
    </div>
  }
}
