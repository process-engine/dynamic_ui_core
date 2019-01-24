/* tslint:disable */
import {Component, Prop} from '@stencil/core';
import {DataModels} from '@process-engine/consumer_api_contracts';

@Component({
  tag: 'number-form-field',
  styleUrl: 'number-form-field.css',
  shadow: false,
})

export class NumberFormField {

  formField: DataModels.UserTasks.UserTaskFormField;

  render() {
    return (
      <div class="form-group">
        <label>{this.formField.label}</label>
        <input type="text" data-inputmask="'mask': '9{+}[,9{*}]'" class="form-control" id={this.formField.id} name={this.formField.label} value={this.formField.defaultValue}></input>
      </div>
    );
  }
}
