import {UserTask} from '@process-engine/consumer_api_contracts';

export interface IDynamicFormBuilder {
  buildFormFor(userTask: UserTask): any;
}
