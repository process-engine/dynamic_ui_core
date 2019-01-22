/* tslint:disable */
import { Component, Prop} from '@stencil/core';
import {DataModels} from '@process-engine/consumer_api_contracts';

@Component({
  tag: 'enum-form-field',
  styleUrl: 'enum-form-field.css',
  shadow: true,
})

export class EnumFormField {

  @Prop() formField: DataModels.UserTasks.UserTaskFormField;

  render() {
    return (
      <div class="form-group">
        <label>{this.formField.label}</label>
        <select class="form-control" id={this.formField.id} name={this.formField.label} placeholder={this.formField.label} value={this.formField.defaultValue}>
          {this.formField.enumValues.map((enumValue) =>
            <option value={enumValue.id}>{enumValue.name}</option>
          )}
        </select>
      </div>
    );
  }
}
