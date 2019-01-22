import {DataModels} from '@process-engine/consumer_api_contracts';

import {IDynamicFormBuilder} from '.';

export class DynamicFormBuilder implements IDynamicFormBuilder {

  public buildFormFor(userTask: DataModels.UserTasks.UserTask): any {

    return '';
  }

  private _buildFormFieldsFor(userTaskConfig: DataModels.UserTasks.UserTaskConfig): Array<string> {
    const formFields: Array<string> = [];

    for (const formFieldConfig of userTaskConfig.formFields) {
      formFields.push(this._buildFormFieldFor(formFieldConfig));
    }

    return formFields;
  }

  private _buildFormFieldFor(formFieldConfig: DataModels.UserTasks.UserTaskFormField): string {

    return '';
  }
}
