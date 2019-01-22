/* tslint:disable */
import { Component, Prop} from '@stencil/core';
import {DataModels} from '@process-engine/consumer_api_contracts';

@Component({
  tag: 'string-form-field',
  styleUrl: 'string-form-field.css',
  shadow: true,
})

export class StringFormField {

  @Prop() formField: DataModels.UserTasks.UserTaskFormField;

  render() {
    return (
      <div class="form-group">
        <label>{this.formField.label}</label>
        <input type="text" data-inputmask="'mask': '9{+}'" class="form-control" id={this.formField.id} name={this.formField.label} placeholder={this.formField.label} value={this.formField.defaultValue}></input>
      </div>
    );
  }
}
