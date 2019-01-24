import {DataModels} from '@process-engine/consumer_api_contracts';
import {Component, Event, EventEmitter, Prop} from '@stencil/core';
import {IUserTask} from './iusertask';

import {IHttpClient} from '@essential-projects/http_contracts';
import {HttpFetchClient} from '../../utils';

@Component({
  tag: 'dynamic-usertask-form-component',
  styleUrl: 'dynamic-usertask-form-component.css',
  shadow: false,
})
export class DynamicUserTaskFormComponent {
  private userTask: IUserTask;

  @Prop() public correlationId: string;
  @Prop() public userTaskId: string;
  @Prop() public accessToken: string;

  @Event() public submited: EventEmitter;

  // tslint:disable-next-line:typedef
  public async componentWillLoad() {
    const stringType: any = 'string';
    const longType: any = 'long';
    const numberType: any = 'number';
    const booleanType: any = 'boolean';
    const dateType: any = 'date';
    const enumType: any = 'enum';

    const userTaskData: DataModels.UserTasks.UserTaskConfig = {
      formFields: [{
        id: 'testText',
        type: stringType,
        label: 'Testtext',
        defaultValue: 'Test1234',
      },
      {
        id: 'testLong',
        type: longType,
        label: 'Testlong',
        defaultValue: '1234',
      },
      {
        id: 'testDecimal',
        type: numberType,
        label: 'TestDecimal',
        defaultValue: '1234,1234',
      },
      {
        id: 'testBoolean',
        type: booleanType,
        label: 'TestBoolean',
        defaultValue: 'true',
      },
      {
        id: 'testDate',
        type: dateType,
        label: 'TestDate',
        defaultValue: '20.12.1983',
      },
      {
        id: 'testEnum',
        type: enumType,
        label: 'TestEnum',
        enumValues: [{id: '1', name: 'Wert1'}, {id: '2', name: 'Wert2'}],
        defaultValue: '1',
      }],
    };

    const userTask: DataModels.UserTasks.UserTask = {
      id: 'USER-TASK-ID',
      flowNodeInstanceId: '',
      name: 'USER-TASK-NAME',
      correlationId: '',
      processInstanceId: '',
      processModelId: '',
      data: userTaskData,
      tokenPayload: 'asd',
    };

    this.userTask = userTask;
    // const identity: IIdentity = {token: this.accessToken};
    // const httpClient: IHttpClient = new HttpFetchClient();
    // const externalAccessor: ExternalAccessor = new ExternalAccessor(httpClient);
    // const consumerApi: IConsumerApi = new ConsumerApiClientService(externalAccessor);
    // const userTasksList: UserTaskList = await consumerApi.getUserTasksForCorrelation(identity, this.correlationId);
    // this.userTask = userTasksList.userTasks.find((u: UserTask) => {
    //   return u.id === this.userTaskId;
    // });

  }

  private handleSubmit(event: Event): void {
    event.preventDefault();
    this.submited.emit('bla');
  }

  // tslint:disable-next-line:typedef
  public render() {
    return <div class='card form_card'>
      <div class='card-body'>
        <h3 class='card-title'>{this.userTask.name}</h3>

        <form onSubmit={(e: Event): void => this.handleSubmit(e)} >
          <input type='hidden' id='access_token' name='access_token' value={this.accessToken} />
          <input type='hidden' name='correlationId' value={this.correlationId} />
          <input type='hidden' name='processInstanceId' value={this.userTask.processInstanceId} />
          <input type='hidden' name='userTaskId' value={this.userTaskId} />
          <usertask-component userTask={this.userTask}></usertask-component>
          <input type='submit' class='btn btn-primary' value='Abschließen'></input>
        </form>
      </div>
    </div>;
  }
}
