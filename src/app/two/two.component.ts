import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'example-two',
  // encapsulation: ViewEncapsulation.Native,
  styles: [`
    .example-one {
      font-size: 19px;
      margin-bottom: 10px;
    }
  `],
  template: `
    <div class="example-two">
      <h4>{{ user.name }}</h4>
      <h5>{{ user.age }} years old</h5>
      {{ user.location }} <br />
      {{ user.email }}

      <button (click)="update()">Internal update</button>
      <p>* should not update</p>
    </div>
  `
})
export class ExampleTwoComponent {
  @Input() user: any;

  constructor() {}

  update() {
    this.user.name = 'Matt Skiba';
  }
}
