/* eslint-disable dot-notation */
import {
  Component, Event, EventEmitter, JSX, Prop, Watch, h,
} from '@stencil/core';

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

  private formFieldComponentsForType: Array<IConstructor<IFormField>> = [];
  private formFields: Array<IFormField> = [];

  constructor() {
    this.formFieldComponentsForType['string'] = StringFormField;
    this.formFieldComponentsForType['long'] = LongFormField;
    this.formFieldComponentsForType['number'] = NumberFormField;
    this.formFieldComponentsForType['boolean'] = BooleanFormField;
    this.formFieldComponentsForType['decimal'] = NumberFormField;
    this.formFieldComponentsForType['date'] = DateFormField;
    this.formFieldComponentsForType['enum'] = EnumFormField;
  }

  public componentWillLoad(): void {
    this.watchUserTaskHandler(this.usertask, undefined);
  }

  @Watch('usertask')
  public watchUserTaskHandler(newUserTask: IUserTask, oldUserTask: IUserTask): void {
    this.formFields = [];

    const hasUserTask: boolean = newUserTask !== undefined && newUserTask !== null;

    if (hasUserTask) {
      for (const formField of newUserTask.data.formFields) {
        const component: any = this.createComponentForFormField(formField);
        component.componentWillLoad();
        this.formFields.push(component);
      }
    }
  }

  public render(): JSX.Element {
    const hasUserTask: boolean = this.usertask !== undefined && this.usertask !== null;
    if (hasUserTask) {
      // eslint-disable-next-line dot-notation
      const isConfirmUserTask: boolean = this.usertask.data['customForm'] === 'confirm' || this.usertask.data.preferredControl === 'confirm';

      if (isConfirmUserTask) {

        return this.renderConfirmUserTask();
      }

      return this.renderUserTask();

    }

    return <div class='card form_card'>
      <div class='card-body'>
        <h3 class='card-title mb-0'>UserTask finished.</h3>
      </div>
    </div>;

  }

  private renderConfirmUserTask(): JSX.Element {
    const firstBooleanFormField: DataModels.UserTasks.UserTaskFormField =
      this.usertask.data.formFields.find((formField: DataModels.UserTasks.UserTaskFormField): boolean => {
        return formField.type === 'boolean';
      });

    const indexOfFormField: number = this.usertask.data.formFields.indexOf(firstBooleanFormField);

    this.formFields.splice(indexOfFormField, 1);

    if (!firstBooleanFormField) {
      return this.renderUserTask();
    }

    return <div class='card form_card'>
      <div class='card-body'>

        <h3 class='card-title'>{this.usertask.name}</h3>

        {
          this.formFields.map((formField: IFormField): void => {
            return formField.render();
          })
        }

        <p>{firstBooleanFormField.label}</p>
        <br></br>
        <div class='float-right'>
          <button type='button' class='btn btn-secondary' onClick={(e: Event): void => this.handleCancel(e)}
            id='dynamic-ui-wrapper-cancel-button'>Cancel</button>&nbsp;
          <button type='button' class='btn btn-danger' onClick={(e: Event): void => this.handleDecline(e)}
            id='dynamic-ui-wrapper-decline-button'>Decline</button>&nbsp;
          <button type='button' class='btn btn-success' onClick={(e: Event): void => this.handleProceed(e)}
            id='dynamic-ui-wrapper-proceed-button'>Proceed</button>
        </div>
      </div>
    </div>;
  }

  private renderUserTask(): JSX.Element {

    return <div class='card form_card'>
      <div class='card-body'>

        <h3 class='card-title'>{this.usertask.name}</h3>

        <form onSubmit={(e: Event): void => this.handleSubmit(e)} >
          {
            this.formFields.map((formField: IFormField): void => {
              return formField.render();
            })
          }
          <br></br>
          <div class='float-right'>
            <button type='button' class='btn btn-secondary'
              onClick={(e: Event): void => this.handleCancel(e)}
              id='dynamic-ui-wrapper-cancel-button'>Cancel</button>&nbsp;
            <button type='submit' class='btn btn-primary' id='dynamic-ui-wrapper-continue-button'>Continue</button>
          </div>
        </form>
      </div>
    </div>;
  }

  private handleSubmit(event: Event): void {
    event.preventDefault();

    const inputIsValid: boolean = this.isInputValid();

    if (inputIsValid) {
      this.submitted.emit({
        correlationId: this.usertask.correlationId,
        processInstanceId: this.usertask.processInstanceId,
        userTaskId: this.usertask.id,
        flowNodeInstanceId: this.usertask.flowNodeInstanceId,
        results: this.getFormResults(),
      });
    }
  }

  private handleProceed(event: Event): void {
    this.submitted.emit({
      correlationId: this.usertask.correlationId,
      processInstanceId: this.usertask.processInstanceId,
      userTaskId: this.usertask.id,
      flowNodeInstanceId: this.usertask.flowNodeInstanceId,
      results: this.getConfirmResult(true),
    });
  }

  private handleDecline(event: Event): void {
    this.submitted.emit({
      correlationId: this.usertask.correlationId,
      processInstanceId: this.usertask.processInstanceId,
      userTaskId: this.usertask.id,
      flowNodeInstanceId: this.usertask.flowNodeInstanceId,
      results: this.getConfirmResult(false),
    });
  }

  private handleCancel(event: Event): void {
    this.canceled.emit();
  }

  private isInputValid(): boolean {
    for (const formField of this.formFields) {
      const formFieldInputIsInvalid = !formField.isValid;
      if (formFieldInputIsInvalid) {

        return false;
      }
    }

    return true;
  }

  private getFormResults(): DataModels.UserTasks.UserTaskResult {
    const result: DataModels.UserTasks.UserTaskResult = {formFields: {}};

    for (const formField of this.formFields) {
      result.formFields[formField.name] = formField.value;
    }

    return result;
  }

  private getConfirmResult(proceedClicked: boolean): DataModels.UserTasks.UserTaskResult {
    const result: DataModels.UserTasks.UserTaskResult = {formFields: {}};

    const firstBooleanFormField: DataModels.UserTasks.UserTaskFormField =
    this.usertask.data.formFields.find((formField: DataModels.UserTasks.UserTaskFormField): boolean => {
      return formField.type === 'boolean';
    });

    for (const formField of this.formFields) {
      result.formFields[formField.name] = formField.value;
    }

    result.formFields[firstBooleanFormField.id] = proceedClicked;

    return result;
  }

  private createComponentForFormField(formField: DataModels.UserTasks.UserTaskFormField): any {
    const Type: IConstructor<any> = this.formFieldComponentsForType[formField.type];
    const component: any = new Type(formField);
    component.formField = formField;
    component.value = formField.defaultValue;

    return component;
  }

}
