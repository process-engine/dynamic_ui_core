/* tslint:disable */
import {Component, Prop} from '@stencil/core';
import {DataModels} from '@process-engine/consumer_api_contracts';

@Component({
  tag: 'boolean-form-field',
  styleUrl: 'boolean-form-field.css',
  shadow: true,
})

export class BooleanFormField {

  formField: DataModels.UserTasks.UserTaskFormField;

  render() {
    return <div class="form-check">
      <input class="form-check-input" id={this.formField.id} type="checkbox" checked={this.formField.defaultValue === 'true'}></input>
      <label class="form-check-label" htmlFor={this.formField.id}>
        {this.formField.label}
      </label>
    </div>;
  }
}
