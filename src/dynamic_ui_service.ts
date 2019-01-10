import {IIdentity} from '@essential-projects/iam_contracts';
import {IConsumerApi, Messages, UserTask, UserTaskList, UserTaskResult} from '@process-engine/consumer_api_contracts';
import {
  DialogForCorrelationMessage,
  IDynamicUIApi,
  IDynamicUISession,
  OnDialogForCorrelationCallback,
} from '@process-engine/dynamic_ui_contracts';

import * as fs from 'fs';
import * as Handlebars from 'handlebars';
import {Logger} from 'loggerhythm';

import {IDynamicFormBuilder} from '.';

export class DynamicUIService implements IDynamicUIApi {

  private logger: Logger = Logger.createLogger('Dynamic_UI_Service');

  private readonly consumerApi: IConsumerApi;
  private readonly dynamicFormBuilder: IDynamicFormBuilder;
  private readonly dynamicUISession: IDynamicUISession;

  constructor(consumerApi: IConsumerApi, dynamicFormBuilder: IDynamicFormBuilder, dynamicUISession: IDynamicUISession) {
    this.consumerApi = consumerApi;
    this.dynamicFormBuilder = dynamicFormBuilder;
    this.dynamicUISession = dynamicUISession;
  }

  public get assetsPath(): string {
    return `${__dirname}/assets`;
  }

  public onDialogForCorrelation(identity: IIdentity, correlationId: string, showDialogCallback: OnDialogForCorrelationCallback): void {
    this.logger.info('onDialogForCorrelation');

    this.consumerApi.onUserTaskWaiting(identity, (message: Messages.SystemEvents.UserTaskReachedMessage) => {

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

    const identity: IIdentity = await this.dynamicUISession.getIdentityForSessionId(sessionId);
    const userTaskList: UserTaskList = await this.consumerApi.getUserTasksForCorrelation(identity, correlationId);
    const userTask: UserTask = userTaskList.userTasks.find((u: UserTask) => u.flowNodeInstanceId === userTaskId);

    return this.dynamicFormBuilder.buildFormFor(userTask);
  }

  public async finishDialog(sessionId: string, resultData: any): Promise<any> {

    const identity: IIdentity = {token: sessionId};

    console.log(identity.token);

    const userTaskResult: UserTaskResult = {
      formFields: resultData.form_fields,
    };

    await this.consumerApi.finishUserTask(
      identity, resultData.processInstanceId, resultData.correlationId, resultData.userTaskId, userTaskResult);

    const userTaskList: UserTaskList = await this.consumerApi.getUserTasksForCorrelation(identity, resultData.correlationId);

    const hasUserTasksForCorrelation: boolean = userTaskList.userTasks.length > 0;
    if (hasUserTasksForCorrelation) {
      const userTask: UserTask = userTaskList.userTasks.shift();

      return this.dynamicFormBuilder.buildFormFor(userTask);
    }

    const template: string = fs.readFileSync(`${__dirname}/templates/dialog_finished.html`).toString();

    return Handlebars.compile(template)({});
  }

}
