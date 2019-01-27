
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
  private formFields: Array<any> = [];

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

  // tslint:disable-next-line:typedef
  public componentWillLoad() {
    for (const formField of this.userTask.data.formFields) {
      const component: any = this.createComponentForFormField(formField);
      component.componentWillLoad();
      this.formFields.push(component);
    }
  }

  // tslint:disable-next-line:typedef
  public render() {
    {
      return this.formFields.map((formField: any) => {
        return formField.render();
      });
    }
  }

  private createComponentForFormField(formField: DataModels.UserTasks.UserTaskFormField): any {
    const type: IConstructor<any> = this.formFieldComponentsForTyp[formField.type];
    const component: any = new type();
    component.formField = formField;
    component.value = formField.defaultValue;

    return component;
  }
}
