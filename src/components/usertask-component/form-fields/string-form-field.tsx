/* tslint:disable */
import {DataModels} from '@process-engine/consumer_api_contracts';
import {Component, State} from '@stencil/core';
import {IFormField} from './iform_field';

@Component({
  tag: 'string-form-field',
  styleUrl: 'string-form-field.css',
  shadow: false,
})
export class StringFormField implements IFormField {

  public formField: DataModels.UserTasks.UserTaskFormField;

  public get name(): string {
    return this.formField.id;
  }

  @State() public value: string;

  // tslint:disable-next-line:typedef
  public componentWillLoad() {
    this.value = this.formField.defaultValue;
  }

  handleSelect(event) {
    console.log(event.target.value);
    this.value = event.target.value;
  }

  // tslint:disable-next-line:typedef
  public render() {
    return (
      <div class='form-group'>
        <label htmlFor={this.formField.id}>{this.formField.label}</label>
        <input type='text'
          class='form-control' id={this.formField.id} name={this.formField.id} value={this.value} onInput={(event) => this.handleSelect(event)}>
        </input>
      </div>
    );
  }
}
