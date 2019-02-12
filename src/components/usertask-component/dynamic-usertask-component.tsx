import {Component, Event, EventEmitter, Prop, Watch} from '@stencil/core';

import {DataModels} from '@process-engine/consumer_api_contracts';

import {
  BooleanFormField,
  DateFormField,
  EnumFormField,
  IConstructor,
  IFormField,
  IUserTask,
  LongFormField,
  NumberFormField,
  StringFormField,
} from '.';

@Component({
  tag: 'dynamic-usertask-component',
  styleUrl: 'dynamic-usertask-component.css',
  shadow: false,
})
export class DynamicUserTaskComponent {
  @Prop() public usertask: IUserTask;
  @Event() public submitted: EventEmitter;
  @Event() public canceled: EventEmitter;

  private _formFieldComponentsForTyp: Array<IConstructor<IFormField>> = [];
  private _formFields: Array<IFormField> = [];

  constructor() {
    this._formFieldComponentsForTyp['string'] = StringFormField;
    this._formFieldComponentsForTyp['long'] = LongFormField;
    this._formFieldComponentsForTyp['number'] = NumberFormField;
    this._formFieldComponentsForTyp['boolean'] = BooleanFormField;
    this._formFieldComponentsForTyp['decimal'] = NumberFormField;
    this._formFieldComponentsForTyp['date'] = DateFormField;
    this._formFieldComponentsForTyp['enum'] = EnumFormField;
  }

  public componentWillLoad(): void {
    this.watchUserTaskHandler(this.usertask, undefined);
  }

  @Watch('usertask')
  public watchUserTaskHandler(newUserTask: IUserTask, oldUserTask: IUserTask): void {
    this._formFields = [];

    const hasUserTask: boolean = newUserTask !== undefined && newUserTask !== null;

    if (hasUserTask) {
      for (const formField of newUserTask.data.formFields) {
        const component: any = this._createComponentForFormField(formField);
        component.componentWillLoad();
        this._formFields.push(component);
      }
    }
  }

  public render(): any {
    const hasUserTask: boolean = this.usertask !== undefined && this.usertask !== null;
    if (hasUserTask) {
      return <div class='card form_card'>
        <div class='card-body'>

          <h3 class='card-title'>{this.usertask.name}</h3>

          <form onSubmit={(e: Event): void => this._handleSubmit(e)} >
            {
              this._formFields.map((formField: any) => {
                return formField.render();
              })
            }
            <div>
              <button type='button' class='btn btn-secondary' onClick={(e: Event): void => this._handleCancel(e)}
                id='dynamic-ui-wrapper-cancel-button'>Cancel</button>
              <button type='submit' class='btn btn-primary' id='dynamic-ui-wrapper-continue-button'>Continue</button>
            </div>
          </form>
        </div>
      </div>;
    } else {
      return <div class='card form_card'>
        <div class='card-body'>
          <h3 class='card-title mb-0'>UserTask finished.</h3>
        </div>
      </div>;
    }
  }

  private _handleSubmit(event: Event): void {
    event.preventDefault();

    this.submitted.emit({
      correlationId: this.usertask.correlationId,
      processInstanceId: this.usertask.processInstanceId,
      userTaskId: this.usertask.id,
      userTaskInstanceId: this.usertask.flowNodeInstanceId,
      results: this._getFormResults(),
    });
  }

  private _handleCancel(event: Event): void {
    this.canceled.emit();
  }

  private _getFormResults(): DataModels.UserTasks.UserTaskResult {
    const result: DataModels.UserTasks.UserTaskResult = {formFields: {}};

    for (const formField of this._formFields) {
      result.formFields[formField.name] = formField.value;
    }

    return result;
  }

  private _createComponentForFormField(formField: DataModels.UserTasks.UserTaskFormField): any {
    const type: IConstructor<any> = this._formFieldComponentsForTyp[formField.type];
    const component: any = new type();
    component.formField = formField;
    component.value = formField.defaultValue;

    return component;
  }
}
