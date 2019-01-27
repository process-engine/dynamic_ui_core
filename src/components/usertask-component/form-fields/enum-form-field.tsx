/* tslint:disable */
import {Component, Prop, State} from '@stencil/core';
import {DataModels} from '@process-engine/consumer_api_contracts';

@Component({
  tag: 'enum-form-field',
  styleUrl: 'enum-form-field.css',
  shadow: true,
})

export class EnumFormField {

  formField: DataModels.UserTasks.UserTaskFormField;

  @State() public value: string;

  // tslint:disable-next-line:typedef
  public componentWillLoad() {
    this.value = this.formField.defaultValue;
  }

  handleSelect(event) {
    console.log(event.target.value);
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
