import {DataModels} from '@process-engine/consumer_api_contracts';
import {Component, State} from '@stencil/core';
import {IFormField} from './iform_field';
import {IKeyDownOnInputEvent} from './ikey_down_on_input_event';

@Component({
  tag: 'string-form-field',
  styleUrl: 'string-form-field.css',
  shadow: false,
})
export class StringFormField implements IFormField {

  @State() public value: string;
  public isValid: boolean = true;

  public formField: DataModels.UserTasks.UserTaskFormField;

  public get name(): string {
    return this.formField.id;
  }

  public componentWillLoad(): void {
    this.value = this.formField.defaultValue;
  }

  public render(): any {
    return <div class='form-group'>
              <label htmlFor={this.formField.id}>{this.formField.label}</label>
              <input type='text'
                class='form-control' id={this.formField.id} name={this.formField.id} value={this.value}
                onInput={(event: IKeyDownOnInputEvent): void => this._handleChange(event)}>
              </input>
            </div>;
  }

  private _handleChange(event: IKeyDownOnInputEvent): void {
    this.value = event.target.value;
  }
}
