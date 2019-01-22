/* tslint:disable */
import { Component, Prop} from '@stencil/core';

@Component({
  tag: 'long-form-field',
  styleUrl: 'long-form-field.css',
  shadow: true,
})

export class LongFormField {

  @Prop() label: string;
  @Prop() id: string;
  @Prop() defaultValue: string;

  @Prop() dynamicUiField: HTMLLabelElement;
  @Prop() formFields: Array<string>;


  render() {
    return <div class="form-group">
              <label for={this.dynamicUiField[this.id]}>{this.label}:</label>
              <input type="text" data-inputmask="'mask': '9{+}'" class="form-control" id={this.dynamicUiField[this.id]} name={this.formFields[this.id]} placeholder={this.label} value={this.defaultValue}/>
            </div>
  }
}
