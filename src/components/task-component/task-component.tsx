import { DataModels } from '@process-engine/consumer_api_contracts';
import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true,
})
export class MyComponent {

  @Prop() public userTask: DataModels.UserTasks.UserTask;

  private getText(): string {
    console.log(this.userTask.id);
    return 'ID: ' + this.userTask.id + ' , Name: ' + this.userTask.name;
  }

  public render() {
    return <div>{this.getText()} <boolean-form-field label='True or False?'></boolean-form-field></div>;
  }
}
