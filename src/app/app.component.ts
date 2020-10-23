import { AfterContentInit, Component, ComponentFactoryResolver, ComponentRef, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { AuthFormComponent } from './auth-form/auth-form.component';

import { User } from './auth-form/auth-form.interface';

@Component({
  selector: 'app-root',
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

      <example-one></example-one>
      <example-two></example-two>
      <example-three></example-three>
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

  constructor(
    private resolver: ComponentFactoryResolver
  ) {}

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
}
