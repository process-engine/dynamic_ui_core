/* tslint:disable */
import {Component, Prop, State} from '@stencil/core';
import {DataModels} from '@process-engine/consumer_api_contracts';
import {IFormField} from './iform_field';

@Component({
  tag: 'long-form-field',
  styleUrl: 'long-form-field.css',
  shadow: true,
})

export class LongFormField implements IFormField {

  formField: DataModels.UserTasks.UserTaskFormField;

  public get name(): string {
    return this.formField.id;
  }

  @State() public value: string;

  // tslint:disable-next-line:typedef
  public componentWillLoad() {
    this.value = this.formField.defaultValue;
  }

  handleInput(event) {
    const value: string = event.target.value;

    if (value.match('^\\d+$')) {
      this.value = value;
    } else {
      event.preventDefault();
    }
  }

  handleKeyDown(event) {
    const value: string = (this.value) ? this.value + event.key : event.key;

    console.log(value);
    if (!value.match('^\\d+$')) {
      console.log('match');
      event.preventDefault();
    }
  }

  render() {
    return (
      <div class="form-group">
        <label htmlFor={this.formField.id}>{this.formField.label}</label>
        <input type="text" class="form-control" id={this.formField.id} name={this.formField.label} value={this.value} onKeyDown={(event) => this.handleKeyDown(event)} onInput={(event) => this.handleInput(event)}></input>
      </div>
    );
  }
}
