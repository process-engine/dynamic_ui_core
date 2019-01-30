import {IDynamicUIApi} from '@process-engine/dynamic_ui_contracts';

import * as fs from 'fs';
import * as Handlebars from 'handlebars';

export class DynamicUIService implements IDynamicUIApi {

  public get assetsPath(): string {
    return `${__dirname}/assets`;
  }

  public async getIndex(formKey: string): Promise<any> {
    const template: string = fs.readFileSync(`${__dirname}/templates/index.html`).toString();

    return Handlebars.compile(template)({form_key: formKey});
  }
  public async getWebcomponent(formKey: string): Promise<any> {
    const webcomponent: string = fs.readFileSync(`${__dirname}/dynamic-usertask-component.js`).toString();

    return webcomponent;
  }

}
