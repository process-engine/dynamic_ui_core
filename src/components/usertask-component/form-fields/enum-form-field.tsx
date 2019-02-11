import {Component, State} from '@stencil/core';

import {DataModels} from '@process-engine/consumer_api_contracts';

import {IFormField} from './iform_field';

@Component({
  tag: 'enum-form-field',
  styleUrl: 'enum-form-field.css',
  shadow: true,
})
export class EnumFormField implements IFormField {

  @State() public value: string;

  public formField: DataModels.UserTasks.UserTaskFormField;

  public get name(): string {
    return this.formField.id;
  }

  public componentWillLoad(): void {
    this.value = this.formField.defaultValue;
  }

  public render(): any {
    return (
      <div class='form-group'>
        <label>{this.formField.label}</label>
        <select class='form-control' id={this.formField.id} name={this.formField.label} onInput={(event: any): void => this._handleSelect(event)}>
          {
            this.formField.enumValues.map((enumValue: DataModels.UserTasks.UserTaskEnumValue): any => {
              return <option value={enumValue.id} selected={this.value === enumValue.id}>{enumValue.name}</option>;
            })
          }
        </select>
      </div>
    );
  }

  public _handleSelect(event: any): void {
    this.value = event.target.value;
  }
}
