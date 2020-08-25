import {DataModels} from '@process-engine/consumer_api_contracts';
import {
  Component, JSX, Prop, State, h,
} from '@stencil/core';

import {IFormField} from './iform_field';

@Component({
  tag: 'boolean-form-field',
  styleUrl: 'boolean-form-field.css',
  shadow: true,
})
export class BooleanFormField implements IFormField {

  @Prop() public formField: DataModels.UserTasks.UserTaskFormField;
  public isValid: boolean = true;

  public get name(): string {
    return this.formField.id;
  }

  @State() public value: boolean;
  public componentWillLoad(): void {
    this.value = this.formField.defaultValue === 'true' || this.formField.defaultValue === '1' || this.formField.defaultValue === true;
  }

  public render(): JSX.Element {
    return <div class='form-check'>
      <input class='form-check-input' id={this.formField.id} type='checkbox'
        checked={this.value} onInput={(event: any): void => this.handleClick(event)}></input>
      <label class='form-check-label' htmlFor={this.formField.id}>
        {this.formField.label}
      </label>
    </div>;
  }

  private handleClick(event: any): void {
    this.value = event.target.checked === true;
  }

}
