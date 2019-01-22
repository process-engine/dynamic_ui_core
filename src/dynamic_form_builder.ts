import {UserTask, UserTaskConfig, UserTaskFormField} from '@process-engine/consumer_api_contracts';

import {IDynamicFormBuilder} from '.';

export class DynamicFormBuilder implements IDynamicFormBuilder {

  public buildFormFor(userTask: UserTask): any {

    return '';
  }

  private _buildFormFieldsFor(userTaskConfig: UserTaskConfig): Array<string> {
    const formFields: Array<string> = [];

    for (const formFieldConfig of userTaskConfig.formFields) {
      formFields.push(this._buildFormFieldFor(formFieldConfig));
    }

    return formFields;
  }

  private _buildFormFieldFor(formFieldConfig: UserTaskFormField): string {

    return '';
  }
}
