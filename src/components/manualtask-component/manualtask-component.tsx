import {
  Component, Event, EventEmitter, JSX, Prop, Watch, h,
} from '@stencil/core';

import {IManualTask} from './imanualtask';

@Component({
  tag: 'manualtask-component',
  styleUrl: 'manualtask-component.css',
  shadow: false,
})
export class ManualTaskComponent {

  @Prop() public manualtask: IManualTask;
  @Event() public continued: EventEmitter;
  @Event() public canceled: EventEmitter;

  public render(): JSX.Element {
    const hasManualTask: boolean = this.manualtask !== undefined && this.manualtask !== null;
    if (hasManualTask) {

      return (<div class='card form_card'>
        <div class='card-body'>
          <h3 class='card-title'>{this.manualtask.name}</h3>
          <br></br>
          <div class='float-right'>
            <button type='button' class='btn btn-secondary' onClick={(e: Event): void => this.handleCancel(e)}
              id='dynamic-ui-wrapper-cancel-button'>Cancel</button>&nbsp;
            <button type='button' class='btn btn-primary' onClick={(e: Event): void => this.handleContinue(e)}
              id='dynamic-ui-wrapper-continue-button'>Continue</button>
          </div>
        </div>
      </div>);

    }

    return <div class='card form_card'>
      <div class='card-body'>
        <h3 class='card-title mb-0'>ManualTask finished.</h3>
      </div>
    </div>;

  }

  private handleContinue(event: Event): void {
    this.continued.emit({
      correlationId: this.manualtask.correlationId,
      processInstanceId: this.manualtask.processInstanceId,
      manualTaskId: this.manualtask.id,
      manualTaskInstanceId: this.manualtask.flowNodeInstanceId,
    });
  }

  private handleCancel(event: Event): void {
    this.canceled.emit();
  }

}
