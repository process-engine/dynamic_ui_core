/* tslint:disable */
import {Component, Prop, State} from '@stencil/core';
import {DataModels} from '@process-engine/consumer_api_contracts';

@Component({
  tag: 'long-form-field',
  styleUrl: 'long-form-field.css',
  shadow: true,
})

export class LongFormField {

  formField: DataModels.UserTasks.UserTaskFormField;

  @State() public value: string;

  // tslint:disable-next-line:typedef
  public componentWillLoad() {
    this.value = this.formField.defaultValue;
  }

  render() {
    return (
      <div class="form-group">
        <label htmlFor={this.formField.id}>{this.formField.label}</label>
        <input type="text" data-inputmask="'mask': '9{+}'" class="form-control" id={this.formField.id} name={this.formField.label} value={this.value}></input>
      </div>
    );
  }
}
