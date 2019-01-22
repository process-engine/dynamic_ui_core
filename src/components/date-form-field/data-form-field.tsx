/* tslint:disable */
import { Component, Prop} from '@stencil/core';

@Component({
  tag: 'date-form-field',
  styleUrl: 'date-form-field.css',
  shadow: true,
})

export class DateFormField {

  @Prop() label: string;
  @Prop() id: string;
  @Prop() defaultValue: string;

  render() {
    return<div class="form-group">
            <label>{this.label}</label>
            <input type="text" data-provide="datepicker" class="form-control" id="dynamic-ui-field-{this.id}" name="form_fields[{this.id}]" placeholder={this.label} value={this.defaultValue}/>
          </div>
  }
}
