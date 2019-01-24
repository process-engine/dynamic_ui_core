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
  @Prop() public userTask: IUserTask;

  @Event() public submited: EventEmitter;

  private handleSubmit(event: Event): void {
    event.preventDefault();
    this.submited.emit({
      correlationId: this.userTask.correlationId,
      processInstanceId: this.userTask.processInstanceId,
      userTaskId: this.userTask.id,
    });
  }

  // tslint:disable-next-line:typedef
  public render() {
    return <div class='card form_card'>
      <div class='card-body'>
        <h3 class='card-title'>{this.userTask.name}</h3>

        <form onSubmit={(e: Event): void => this.handleSubmit(e)} >
          <usertask-component userTask={this.userTask}></usertask-component>
          <input type='submit' class='btn btn-primary' value='Abschließen'></input>
        </form>
      </div>
    </div>;
  }
}
