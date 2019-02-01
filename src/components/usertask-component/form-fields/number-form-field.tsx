/* tslint:disable */
import {Component, Prop, State} from '@stencil/core';
import {DataModels} from '@process-engine/consumer_api_contracts';
import {IFormField} from './iform_field';

@Component({
  tag: 'number-form-field',
  styleUrl: 'number-form-field.css',
  shadow: false,
})

export class NumberFormField implements IFormField {

  formField: DataModels.UserTasks.UserTaskFormField;

  public get name(): string {
    return this.formField.id;
  }

  @State() public value: string;

  // tslint:disable-next-line:typedef
  public componentWillLoad() {
    this.value = this.formField.defaultValue;
  }

  handleInspect(event) {
    const value: string = event.target.value;

    if (value.match('9{+}[,9{*}]')) {
      this.value = value;
    } else {
      event.preventDefault();
    }
  }

  render() {
    return (
      <div class="form-group">
        <label>{this.formField.label}</label>
        <input type="text" class="form-control" id={this.formField.id} name={this.formField.label} value={this.value} onInput={(event) => this.handleInspect(event)}></input>
      </div>
    );
  }
}
