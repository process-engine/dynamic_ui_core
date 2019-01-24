
import {DataModels} from '@process-engine/consumer_api_contracts';
import {Component, Prop} from '@stencil/core';

import {IConstructor} from './iconstructor';
import {IUserTask} from './iusertask';

import {BooleanFormField, DateFormField, EnumFormField, LongFormField, NumberFormField, StringFormField} from './form-fields';

@Component({
  tag: 'usertask-component',
  styleUrl: 'usertask-component.css',
  shadow: false,
})
export class UserTaskComponent {
  private formFieldComponentsForTyp: Array<IConstructor<any>> = [];

  @Prop() public userTask: IUserTask;

  constructor() {
    this.formFieldComponentsForTyp['string'] = StringFormField;
    this.formFieldComponentsForTyp['long'] = LongFormField;
    this.formFieldComponentsForTyp['number'] = NumberFormField;
    this.formFieldComponentsForTyp['boolean'] = BooleanFormField;
    this.formFieldComponentsForTyp['decimal'] = NumberFormField;
    this.formFieldComponentsForTyp['date'] = DateFormField;
    this.formFieldComponentsForTyp['enum'] = EnumFormField;
  }

  private createComponentForFormField(formField: DataModels.UserTasks.UserTaskFormField): any {
    const type: IConstructor<any> = this.formFieldComponentsForTyp[formField.type];
    const component: any = new type();
    component.formField = formField;

    return component;
  }

  // tslint:disable-next-line:typedef
  public render() {
    return this.userTask.data.formFields.map((formField: DataModels.UserTasks.UserTaskFormField) => {
      return this.createComponentForFormField(formField).render();
    });
  }
}
