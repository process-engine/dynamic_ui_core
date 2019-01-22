/* tslint:disable */
import { Component, Prop} from '@stencil/core';

@Component({
  tag: 'dynamic-form',
  styleUrl: 'dynamic-form.css',
  shadow: true,
})

export class DialogFinished {

  private submitValue: string = 'Abschließen';

  @Prop() userTaskName: string;
  @Prop() formFields: any;
  @Prop() processInstanceId: string;
  @Prop() correlationId: string;
  @Prop() userTaskId: string;

  render() {
    return <div class="container-wrapper">
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-5 col-md-6 col-sm-7 col-sx-12 m-auto py-5">
            <div class="card form_card">
              <div class="card-body">
                <h3 class="card-title">{this.userTaskName}</h3>

                <form enctype="application/json" method="post">
                  <input type="hidden" id="access_token" name="access_token" />
                  <input type="hidden" name="correlationId" value={this.correlationId} />
                  <input type="hidden" name="processInstanceId" value={this.processInstanceId} />
                  <input type="hidden" name="userTaskId" value={this.userTaskId} />
                  {/* {{#each this.formFields}}
                    {{{this}}}
                  {{/each}} */}
                  <input type="submit" class="btn btn-primary" value={this.submitValue}/>
                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  }
}
