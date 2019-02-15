import {Component, Event, EventEmitter, Prop, Watch} from '@stencil/core';

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

  public render(): any {
    const hasManualTask: boolean = this.manualtask !== undefined && this.manualtask !== null;
    if (hasManualTask) {
    
      return <div class='card form_card'>
        <div class='card-body'>
          <h3 class='card-title'>{this.manualtask.name}</h3>
          <br></br>
          <div class='float-right'>
            <button type='button' class='btn btn-secondary' onClick={(e: Event): void => this._handleCancel(e)}
              id='dynamic-ui-wrapper-cancel-button'>Cancel</button>&nbsp;
          <button type='button' class='btn btn-primary' onClick={(e: Event): void => this._handleContinue(e)}
              id='dynamic-ui-wrapper-continue-button'>Continue</button>
          </div>
        </div>
      </div>;
      
    } else {
    
      return <div class='card form_card'>
        <div class='card-body'>
          <h3 class='card-title mb-0'>ManualTask finished.</h3>
        </div>
      </div>;
    }
  }

  private _handleContinue(event: Event): void {
    this.continued.emit({
      correlationId: this.manualtask.correlationId,
      processInstanceId: this.manualtask.processInstanceId,
      manualTaskId: this.manualtask.id,
      manualTaskInstanceId: this.manualtask.flowNodeInstanceId,
    });
  }

  private _handleCancel(event: Event): void {
    this.canceled.emit();
  }
}
