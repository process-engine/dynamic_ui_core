/* tslint:disable */
import { DataModels } from '@process-engine/consumer_api_contracts';
import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true,
})
export class MyComponent {

  @Prop() userTask: DataModels.UserTasks.UserTask;

  private getText(): string {
    console.log(this.userTask.id);
    return 'ID: ' + this.userTask.id + ' , Name: ' + this.userTask.name;
  }

  render() {
    return  <div>{this.getText()}
                <div>
                  <boolean-form-field label='BOOLEAN-FORM-FIELD-LABEL'></boolean-form-field>
                </div>
                <div>
                  <date-form-field label="DATE-FORM-FIELD-LABEL" defaultValue="DATE-FORM-FIELD-DEFAULT-VALUE"></date-form-field>
                </div>
            </div>;
  }
}
