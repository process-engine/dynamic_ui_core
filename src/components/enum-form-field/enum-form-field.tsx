/* tslint:disable */
import { Component, Prop} from '@stencil/core';

@Component({
  tag: 'enum-form-field',
  styleUrl: 'enum-form-field.css',
  shadow: true,
})

export class EnumFormField {

  @Prop() name: string;
  @Prop() label: string;
  @Prop() id: string;
  @Prop() defaultValue: string;

  @Prop() dynamicUiField: HTMLLabelElement;
  @Prop() formFields: Array<string>;

  render() {
    return <div class="form-group">
              <label for={this.dynamicUiField}>{this.label}:</label>
              <select class="form-control" id={this.dynamicUiField[this.id]} name={this.formFields[this.id]} placeholder={this.label} value={this.defaultValue}>
                {/* {{#each enumValues}} */}
                <option value={this.id}>{this.name}</option>
                {/* {{/each}} */}
              </select>
            </div>;
  }
}
