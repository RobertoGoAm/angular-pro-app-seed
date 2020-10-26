import { AfterContentInit, ChangeDetectionStrategy, Component, ComponentFactoryResolver, ComponentRef, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { AuthFormComponent } from './auth-form/auth-form.component';

import { User } from './auth-form/auth-form.interface';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.Default,
  styleUrls: ['app.component.scss'],
  template: `
    <div>
      <!-- <ng-container
        [ngTemplateOutlet]="tmpl"
        [ngTemplateOutletContext]="ctx"></ng-container>

      <ng-template
        #tmpl
        let-name
        let-location="location">
        {{ name }} : {{ location }}
      </ng-template> -->
<!--
      <button (click)="addProp()">Add property</button>
      <button (click)="changeUser()">Change user object</button>
      <button (click)="changeName()">Change name property</button>

      <div class="users">
        <example-one [user]="user"></example-one>
        <example-two [user]="user"></example-two>
      </div> -->
<!--
      <label>
        Credit Card Number

        <input
          name="credit-card"
          type="text"
          placeholder="Enter your 16-digits card number"
          credit-card>
      </label>

      <label
        tooltip="3 digits, back of your card"
        #myTooltip="tooltip">
        Enter your security code

        <span
          (mouseover)="myTooltip.show()"
          (mouseout)="myTooltip.hide()">
          (?)
        </span>

        <input type="text">
      </label> -->

      <ul>
        <li *myFor="let item of items; let i = index">
          {{ i }} Member: {{ item.name | json }}
        </li>

        <ng-template myFor [myForOf]="items" let-item let-i="index">
          <li>
            {{ i }} Member: {{ item.name | json }}
          </li>
        </ng-template>
      </ul>
    </div>
  `
})
export class AppComponent implements AfterContentInit {
  component: ComponentRef<AuthFormComponent>;
  @ViewChild('entry', { read: ViewContainerRef }) entry: ViewContainerRef;
  @ViewChild('tmpl') tmpl: TemplateRef<any>;
  ctx = {
      $implicit: 'Todd Motto',
      location: 'England, UK'
  };
  user: any = {
    name: 'Mark Hoppus',
    age: 44,
    location: 'California'
  };
  items = [{
    name: 'Mark Hoppus',
    age: 44,
    location: 'California'
  },{
    name: 'Tom Delonge',
    age: 41,
    location: 'California'
  },{
    name: 'Travis Barker',
    age: 41,
    location: 'California'
  }];

  constructor(
    private resolver: ComponentFactoryResolver
  ) {
    setTimeout(() => {
      this.items = [...this.items, { name: 'Matt Skiba', age: 40, location: 'California' }]
    }, 2000)
  }

  ngAfterContentInit() {
    // const authFormFactory = this.resolver.resolveComponentFactory(AuthFormComponent);
    // this.entry.createComponent(authFormFactory);
    // this.component = this.entry.createComponent(authFormFactory, 0);
    // this.component.instance.title = 'Create Account';
    // this.component.instance.submitted.subscribe(this.loginUser);
    // this.entry.createEmbeddedView(this.tmpl, {
    //   $implicit: 'Motto Todd',
    //   location: 'England, UK'
    // });
  }

  destroyComponent() {
    this.component.destroy();
  }

  moveComponent() {
    this.entry.move(this.component.hostView, 1);
  }

  loginUser(user: User) {
   console.log('Login', user);
  }

  addProp() {
    this.user.email = 'blink@blink-182.net';
  }

  changeName() {
    this.user.name = 'Travis Barker';
  }

  changeUser() {
    this.user = {
      name: 'Tom Delonge',
      age: 41,
      location: 'California'
    };
  }
}
