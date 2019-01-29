/* tslint:disable */
import {Component, Prop, State} from '@stencil/core';
import {DataModels} from '@process-engine/consumer_api_contracts';
import {IFormField} from './iform_field';

@Component({
  tag: 'enum-form-field',
  styleUrl: 'enum-form-field.css',
  shadow: true,
})

export class EnumFormField implements IFormField {

  formField: DataModels.UserTasks.UserTaskFormField;

  public get name(): string {
    return this.formField.id;
  }

  @State() public value: string;

  // tslint:disable-next-line:typedef
  public componentWillLoad() {
    this.value = this.formField.defaultValue;
  }

  handleSelect(event) {
    this.value = event.target.value;
  }

  render() {
    return (
      <div class="form-group">
        <label>{this.formField.label}</label>
        <select class="form-control" id={this.formField.id} name={this.formField.label} onInput={(event) => this.handleSelect(event)}>
          {
            this.formField.enumValues.map(enumValue => {
              return <option value={enumValue.id} selected={this.value === enumValue.id}>{enumValue.name}</option>
            })
          }
        </select>
      </div>
    );
  }
}
