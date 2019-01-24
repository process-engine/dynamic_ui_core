/* tslint:disable */
import {Component} from '@stencil/core';
import {DataModels} from '@process-engine/consumer_api_contracts';

@Component({
  tag: 'date-form-field',
  styleUrl: 'date-form-field.css',
  shadow: true,
})

export class DateFormField {

  formField: DataModels.UserTasks.UserTaskFormField;

  render() {
    return <div class="form-group">
      <label htmlFor={this.formField.id}>{this.formField.label}</label>
      <input type="text" data-provide="datepicker" class="form-control" id={this.formField.id} value={this.formField.defaultValue} />
    </div>
  }
}
