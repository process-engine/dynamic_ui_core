/* tslint:disable */
import {Component, Prop, State} from '@stencil/core';
import {DataModels} from '@process-engine/consumer_api_contracts';

@Component({
  tag: 'boolean-form-field',
  styleUrl: 'boolean-form-field.css',
  shadow: true,
})

export class BooleanFormField {

  formField: DataModels.UserTasks.UserTaskFormField;

  @State() public value: boolean;

  // tslint:disable-next-line:typedef
  public componentWillLoad() {
    this.value = this.formField.defaultValue === 'true';
  }

  render() {
    return <div class="form-check">
      <input class="form-check-input" id={this.formField.id} type="checkbox" checked={this.value}></input>
      <label class="form-check-label" htmlFor={this.formField.id}>
        {this.formField.label}
      </label>
    </div>;
  }
}
