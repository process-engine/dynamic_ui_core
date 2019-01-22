import {DataModels} from '@process-engine/consumer_api_contracts';

export interface IDynamicFormBuilder {
  buildFormFor(userTask: DataModels.UserTasks.UserTask): any;
}
