import {DataModels} from '@process-engine/consumer_api_contracts';
import {Component, State} from '@stencil/core';

import {IFormField} from './iform_field';

@Component({
  tag: 'boolean-form-field',
  styleUrl: 'boolean-form-field.css',
  shadow: true,
})
export class BooleanFormField implements IFormField {

  public formField: DataModels.UserTasks.UserTaskFormField;

  public get name(): string {
    return this.formField.id;
  }

  @State() public value: boolean;
  public componentWillLoad(): void {
    this.value = this.formField.defaultValue === 'true';
  }

  public render(): any {
    return <div class='form-check'>
      <input class='form-check-input' id={this.formField.id} type='checkbox'
        checked={this.value} onInput={(event: any): void => this._handleClick(event)}></input>
      <label class='form-check-label' htmlFor={this.formField.id}>
        {this.formField.label}
      </label>
    </div>;
  }

  private _handleClick(event: any): void {
    this.value = event.target.checked === true;
  }
}
