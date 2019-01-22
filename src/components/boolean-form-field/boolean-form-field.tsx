/* tslint:disable */
import { Component, Prop} from '@stencil/core';

@Component({
  tag: 'boolean-form-field',
  styleUrl: 'boolean-form-field.css',
  shadow: true,
})

export class BooleanFormField {

  @Prop() label: string;

  render() {
    return <div class='form-check'>
            <input class='form-check-input' name='form_fields[{{id}}]' type='checkbox'></input>
            <label>
              {this.label}
            </label>
          </div>;
  }
}
