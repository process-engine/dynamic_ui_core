/* tslint:disable */
import {Component, Prop, State} from '@stencil/core';
import {DataModels} from '@process-engine/consumer_api_contracts';
import {IFormField} from './iform_field';

@Component({
  tag: 'boolean-form-field',
  styleUrl: 'boolean-form-field.css',
  shadow: true,
})

export class BooleanFormField implements IFormField {

  formField: DataModels.UserTasks.UserTaskFormField;

  public get name(): string {
    return this.formField.id;
  }

  @State() public value: boolean;

  // tslint:disable-next-line:typedef
  public componentWillLoad() {
    this.value = this.formField.defaultValue === 'true';
  }

  render() {
    return <div class="form-check">
      <input class="form-check-input" id={this.formField.id} type="checkbox" checked={this.value} onInput={(event) => this.handleClick(event)}></input>
      <label class="form-check-label" htmlFor={this.formField.id}>
        {this.formField.label}
      </label>
    </div>;
  }

  private handleClick(event) {
    this.value = event.target.checked === 'true';
  }
}
