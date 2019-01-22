import * as fs from 'fs';

import {UserTask, UserTaskConfig, UserTaskFormField} from '@process-engine/consumer_api_contracts';

import {IDynamicFormBuilder} from '.';

export class DynamicFormBuilder implements IDynamicFormBuilder {

  public buildFormFor(userTask: UserTask): any {

    const template: string = fs.readFileSync(`${__dirname}/templates/dynamic_form.html`).toString();

    return Handlebars.compile(template)({
      correlationId: userTask.correlationId,
      processInstanceId: userTask.processInstanceId,
      userTaskId: userTask.flowNodeInstanceId,
      userTaskName: userTask.name,
      formFields: this._buildFormFieldsFor(userTask.data),
    });
  }

  private _buildFormFieldsFor(userTaskConfig: UserTaskConfig): Array<string> {
    const formFields: Array<string> = [];

    for (const formFieldConfig of userTaskConfig.formFields) {
      formFields.push(this._buildFormFieldFor(formFieldConfig));
    }

    return formFields;
  }

  private _buildFormFieldFor(formFieldConfig: UserTaskFormField): string {
    const template: string = fs.readFileSync(`${__dirname}/templates/${formFieldConfig.type}_form_field.html`).toString();

    return Handlebars.compile(template)(formFieldConfig);
  }
}
