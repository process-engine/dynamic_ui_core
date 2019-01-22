import {IIdentity} from '@essential-projects/iam_contracts';
import {DataModels, IConsumerApi, Messages} from '@process-engine/consumer_api_contracts';
import {
  DialogForCorrelationMessage,
  IDynamicUIApi,
  IDynamicUISession,
  OnDialogForCorrelationCallback,
} from '@process-engine/dynamic_ui_contracts';

import {IDynamicFormBuilder} from '.';

export class DynamicUIService implements IDynamicUIApi {

  private readonly consumerApi: IConsumerApi;
  private readonly dynamicFormBuilder: IDynamicFormBuilder;

  constructor(consumerApi: IConsumerApi, dynamicFormBuilder: IDynamicFormBuilder) {
    this.consumerApi = consumerApi;
    this.dynamicFormBuilder = dynamicFormBuilder;
  }

  public get assetsPath(): string {
    return `${__dirname}/assets`;
  }

  public onDialogForCorrelation(identity: IIdentity, correlationId: string, showDialogCallback: OnDialogForCorrelationCallback): void {

    this.consumerApi.onUserTaskWaiting(identity, (message: Messages.Internal.SystemEvents.UserTaskReachedMessage) => {

      if (message.correlationId === correlationId) {

        const dialogForCorrelationMessage: DialogForCorrelationMessage = {
          correlationId: message.correlationId,
          processInstanceId: message.processInstanceId,
          userTaskId: message.flowNodeInstanceId,
        };

        showDialogCallback(dialogForCorrelationMessage);
      }
    });
  }

  public async getDialog(sessionId: string, formKey: string, correlationId: string, processInstanceId: string, userTaskId: string): Promise<any> {

    const identity: IIdentity = {token: ''};
    const userTaskList: DataModels.UserTasks.UserTaskList = await this.consumerApi.getUserTasksForCorrelation(identity, correlationId);
    const userTask: DataModels.UserTasks.UserTask = userTaskList.userTasks.find(
                                                    (u: DataModels.UserTasks.UserTask) => u.flowNodeInstanceId === userTaskId);

    return this.dynamicFormBuilder.buildFormFor(userTask);
  }

  public async finishDialog(sessionId: string, resultData: any): Promise<any> {

    const identity: IIdentity = {token: sessionId};

    const userTaskResult: DataModels.UserTasks.UserTaskResult = {
      formFields: resultData.form_fields,
    };

    await this.consumerApi.finishUserTask(
      identity, resultData.processInstanceId, resultData.correlationId, resultData.userTaskId, userTaskResult);

    const userTaskList: DataModels.UserTasks.UserTaskList = await this.consumerApi.getUserTasksForCorrelation(identity, resultData.correlationId);

    const hasUserTasksForCorrelation: boolean = userTaskList.userTasks.length > 0;
    if (hasUserTasksForCorrelation) {
      const userTask: DataModels.UserTasks.UserTask = userTaskList.userTasks.shift();

      return this.dynamicFormBuilder.buildFormFor(userTask);
    }

    return '';
  }

}
