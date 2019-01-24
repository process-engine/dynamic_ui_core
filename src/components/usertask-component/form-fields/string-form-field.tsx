import {DataModels} from '@process-engine/consumer_api_contracts';
import {Component, Prop} from '@stencil/core';

@Component({
  tag: 'string-form-field',
  styleUrl: 'string-form-field.css',
  shadow: false,
})

export class StringFormField {

  public formField: DataModels.UserTasks.UserTaskFormField;

  // tslint:disable-next-line:typedef
  public render() {
    return (
      <div class='form-group'>
        <label htmlFor={this.formField.id}>{this.formField.label}</label>
        <input type='text'
          class='form-control' id={this.formField.id} name={this.formField.id} value={this.formField.defaultValue}>
        </input>
      </div>
    );
  }
}
