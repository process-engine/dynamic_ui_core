/* tslint:disable */
import { Component, Prop} from '@stencil/core';

@Component({
  tag: 'dialog-error',
  styleUrl: 'dialog-error.css',
  shadow: true,
})

export class DialogError {

  private title: string = 'Die Aufgabe wurde bereits abgeschlossen.';

  render() {
    return <div class="container-wrapper">
            <div class="container-fluid">
              <div class="row">
                <div class="col-lg-5 col-md-6 col-sm-7 col-sx-12 m-auto py-5">
                  <div class="card bg-danger text-white form_card">
                    <div class="card-body">
                      <h3 class="card-title mb-0">{this.title}</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  }
}
