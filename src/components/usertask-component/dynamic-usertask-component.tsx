/* tslint:disable */
import {DataModels} from '@process-engine/consumer_api_contracts';
import {Component, Event, EventEmitter, Prop} from '@stencil/core';

import {IConstructor} from './iconstructor';
import {IUserTask} from './iusertask';

import {IFormField} from '.';
import {BooleanFormField, DateFormField, EnumFormField, LongFormField, NumberFormField, StringFormField} from './form-fields';

/// form-fields/iform_field

@Component({
  tag: 'dynamic-usertask-component',
  styleUrl: 'dynamic-usertask-component.css',
  shadow: false,
})
export class DynamicUserTaskComponent {
  private formFieldComponentsForTyp: Array<IConstructor<IFormField>> = [];
  private formFields: Array<IFormField> = [];

  @Prop() public userTask: IUserTask;

  @Event() public submitted: EventEmitter;

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
    const hasUserTask: boolean = this.userTask !== undefined && this.userTask !== null;

    if (hasUserTask) {
      for (const formField of this.userTask.data.formFields) {
        const component: any = this.createComponentForFormField(formField);
        component.componentWillLoad();
        this.formFields.push(component);
      }
    }
  }

  // tslint:disable-next-line:typedef
  public render() {
    const hasUserTask: boolean = this.userTask !== undefined && this.userTask !== null;
    if (hasUserTask) {
      return <div class='card form_card'>
        <div class='card-body'>
          <h3 class='card-title'>{this.userTask.name}</h3>

          <form onSubmit={(e: Event): void => this.handleSubmit(e)} >
            {
              this.formFields.map((formField: any) => {
                return formField.render();
              })
            }
            <input type='submit' class='btn btn-primary' value='Abschließen'></input>
          </form>
        </div>
      </div>;
    } else {
      return <div class="card form_card">
        <div class="card-body">
          <h3 class="card-title mb-0">Aufgabe abgeschlossen.</h3>
        </div>
      </div>
    }
  }

  private handleSubmit(event: Event): void {
    event.preventDefault();

    this.submitted.emit({
      correlationId: this.userTask.correlationId,
      processInstanceId: this.userTask.processInstanceId,
      userTaskId: this.userTask.id,
      userTaskInstanceId: this.userTask.flowNodeInstanceId,
      results: this.getFormResults(),
    });
  }

  private getFormResults(): DataModels.UserTasks.UserTaskResult {
    const result: DataModels.UserTasks.UserTaskResult = {formFields: {}};

    for (const formField of this.formFields) {
      result.formFields[formField.name] = formField.value;
    }

    return result;
  }

  private createComponentForFormField(formField: DataModels.UserTasks.UserTaskFormField): any {
    const type: IConstructor<any> = this.formFieldComponentsForTyp[formField.type];
    const component: any = new type();
    component.formField = formField;
    component.value = formField.defaultValue;

    return component;
  }
}
