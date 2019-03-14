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
      const isConfirmUserTask: boolean = this.usertask.data.preferredControl === 'confirm';

      if (isConfirmUserTask) {

        return this._renderConfirmUserTask();
      } else {

        return this._renderUserTask();
      }
    } else {

      return <div class='card form_card'>
        <div class='card-body'>
          <h3 class='card-title mb-0'>UserTask finished.</h3>
        </div>
      </div>;
    }
  }

  private _renderConfirmUserTask(): any {
    const firstBooleanFormField: DataModels.UserTasks.UserTaskFormField =
      this.usertask.data.formFields.find((formField: DataModels.UserTasks.UserTaskFormField) => {
        return formField.type === 'boolean';
      });

    const indexOfFormField: number = this.usertask.data.formFields.indexOf(firstBooleanFormField);

    this._formFields.splice(indexOfFormField, 1);

    return <div class='card form_card'>
      <div class='card-body'>

        <h3 class='card-title'>{this.usertask.name}</h3>

        {
          this._formFields.map((formField: DataModels.UserTasks.UserTaskFormField) => {
            return formField.render();
          })
        }

        <p>{firstBooleanFormField.label}</p>
        <br></br>
        <div class='float-right'>
          <button type='button' class='btn btn-secondary' onClick={(e: Event): void => this._handleCancel(e)}
            id='dynamic-ui-wrapper-cancel-button'>Cancel</button>&nbsp;
          <button type='button' class='btn btn-danger' onClick={(e: Event): void => this._handleDecline(e)}
            id='dynamic-ui-wrapper-decline-button'>Decline</button>&nbsp;
          <button type='button' class='btn btn-success' onClick={(e: Event): void => this._handleProceed(e)}
            id='dynamic-ui-wrapper-proceed-button'>Proceed</button>
        </div>
      </div>
    </div>;
  }

  private _renderUserTask(): any {

    return <div class='card form_card'>
      <div class='card-body'>

        <h3 class='card-title'>{this.usertask.name}</h3>

        <form onSubmit={(e: Event): void => this._handleSubmit(e)} >
          {
            this._formFields.map((formField: any) => {
              return formField.render();
            })
          }
          <br></br>
          <div class='float-right'>
            <button type='button' class='btn btn-secondary'
              onClick={(e: Event): void => this._handleCancel(e)}
              id='dynamic-ui-wrapper-cancel-button'>Cancel</button>&nbsp;
            <button type='submit' class='btn btn-primary' id='dynamic-ui-wrapper-continue-button'>Continue</button>
          </div>
        </form>
      </div>
    </div>;
  }

  private _handleSubmit(event: Event): void {
    event.preventDefault();

    const inputIsValid: boolean = this._isInputValid();

    if (inputIsValid) {
      this.submitted.emit({
        correlationId: this.usertask.correlationId,
        processInstanceId: this.usertask.processInstanceId,
        userTaskId: this.usertask.id,
        flowNodeInstanceId: this.usertask.flowNodeInstanceId,
        results: this._getFormResults(),
      });
    }
  }

  private _handleProceed(event: Event): void {
    this.submitted.emit({
      correlationId: this.usertask.correlationId,
      processInstanceId: this.usertask.processInstanceId,
      userTaskId: this.usertask.id,
      flowNodeInstanceId: this.usertask.flowNodeInstanceId,
      results: this._getConfirmResult(true),
    });
  }

  private _handleDecline(event: Event): void {
    this.submitted.emit({
      correlationId: this.usertask.correlationId,
      processInstanceId: this.usertask.processInstanceId,
      userTaskId: this.usertask.id,
      flowNodeInstanceId: this.usertask.flowNodeInstanceId,
      results: this._getConfirmResult(false),
    });
  }

  private _handleCancel(event: Event): void {
    this.canceled.emit();
  }

  private _isInputValid(): boolean {
    for (const formField of this._formFields) {
      const formFieldInputIsInvalid: boolean = !formField.isValid;
      if (formFieldInputIsInvalid) {

        return false;
      }
    }

    return true;
  }

  private _getFormResults(): DataModels.UserTasks.UserTaskResult {
    const result: DataModels.UserTasks.UserTaskResult = {formFields: {}};

    for (const formField of this._formFields) {
      result.formFields[formField.name] = formField.value;
    }

    return result;
  }

  private _getConfirmResult(proceedClicked: boolean): DataModels.UserTasks.UserTaskResult {
    const result: DataModels.UserTasks.UserTaskResult = {formFields: {}};
    const firstFormField: DataModels.UserTasks.UserTaskFormField = this.usertask.data.formFields[0];

    result.formFields[firstFormField.id] = proceedClicked;

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
