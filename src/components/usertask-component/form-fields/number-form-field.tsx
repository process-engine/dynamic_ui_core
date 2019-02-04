/* tslint:disable */
import {Component, Prop, State} from '@stencil/core';
import {DataModels} from '@process-engine/consumer_api_contracts';
import {IFormField} from './iform_field';
import {InputValidator} from './input_validator';

@Component({
  tag: 'number-form-field',
  styleUrl: 'number-form-field.css',
  shadow: false,
})

export class NumberFormField implements IFormField {
  private readonly inputValidator: InputValidator = new InputValidator('^-?\\d*\\,?\\d*$');

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

    if (this.inputValidator.isValid(value)) {
      this.value = value;
    } else {
      event.preventDefault();
    }
  }

  handleKeyDown(event) {
    const value: string = this.value + event.key;

    if (this.inputValidator.shouldValidateKey(event.keyCode) && !this.inputValidator.isValid(value)) {
      event.preventDefault();
    }
  }

  render() {
    return (
      <div class="form-group">
        <label>{this.formField.label}</label>
        <input type="text" class="form-control" id={this.formField.id} name={this.formField.label} value={this.value} onKeyDown={(event) => this.handleKeyDown(event)} onInput={(event) => this.handleInput(event)}></input>
      </div>
    );
  }
}
