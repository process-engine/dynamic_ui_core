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

  @Prop() formFields: Array<string>;


  render() {
    return (
            <div class="form-group">
              {this.formFields.map((field: any) =>
                <div>
                  <label>{field.label}</label>
                  <input type={field.type} data-inputmask="'mask': '9{+}'" class="form-control" id={field.id} name={field.label} placeholder={field.label} value={field.defaultValue}></input>
                </div>
              )
            }
            </div>
          );
  }
}
