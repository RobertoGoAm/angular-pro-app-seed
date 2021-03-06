import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  DoCheck,
  NgZone,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { AuthFormComponent } from "./auth-form/auth-form.component";

import { User } from "./auth-form/auth-form.interface";
import { FileSizePipe } from "./filesize.pipe";

import "rxjs/add/operator/filter";
import { Store } from "./store";

interface File {
  name: string;
  size: any;
  type: string;
}

@Component({
  selector: "app-root",
  changeDetection: ChangeDetectionStrategy.Default,
  styleUrls: ["app.component.scss"],
  styles: [
    `
      pizza-viewer,
      side-viewer,
      drink-viewer {
        display: block;
        border-bottom: 2px solid #eee;
        padding: 20px 0;
      }
    `
  ],
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
      <!--
      <ul>
        <li *myFor="let item of items; let i = index">
          {{ i }} Member: {{ item.name | json }}
        </li>

        <ng-template myFor [myForOf]="items" let-item let-i="index">
          <li>
            {{ i }} Member: {{ item.name | json }}
          </li>
        </ng-template>
      </ul> -->
      <!--
      <div *ngFor="let file of mapped">
        <p>{{ file.name }}</p>
        <p>{{ file.size }}</p>
      </div> -->
      <!--
      <stock-inventory></stock-inventory> -->
      <!-- <header>
        <img src="/img/logo.svg" />
      </header>
      <div class="app__content">
        <nav>
          <a
            [routerLink]="[
              '/mail',
              { outlets: { primary: 'folder/inbox', pane: null } }
            ]"
            routerLinkActive="active"
          >
            Inbox
          </a>

          <a
            [routerLink]="[
              '/mail',
              { outlets: { primary: 'folder/trash', pane: null } }
            ]"
            routerLinkActive="active"
          >
            Trash
          </a>

          <a [routerLink]="['/dashboard']" routerLinkActive="active">
            Dashboard
          </a>
        </nav>
        <router-outlet></router-outlet>
      </div> -->
      <!-- <pizza-viewer></pizza-viewer> -->
      <!-- <side-viewer></side-viewer> -->
      <!-- <drink-viewer></drink-viewer> -->
      <!-- Counter: {{ counter }} -->
      <!-- <div>
        <div *ngFor="let todo of todos$ | async">
          {{ todo.name }}
        </div>
      </div> -->
      <song-playlist></song-playlist>
      <song-listened></song-listened>
      <song-favourites></song-favourites>
    </div>
  `,
  providers: [FileSizePipe]
})
export class AppComponent implements AfterContentInit, OnInit, DoCheck {
  component: ComponentRef<AuthFormComponent>;
  @ViewChild("entry", { read: ViewContainerRef }) entry: ViewContainerRef;
  @ViewChild("tmpl") tmpl: TemplateRef<any>;
  ctx = {
    $implicit: "Todd Motto",
    location: "England, UK"
  };
  user: any = {
    name: "Mark Hoppus",
    age: 44,
    location: "California"
  };
  items = [
    {
      name: "Mark Hoppus",
      age: 44,
      location: "California"
    },
    {
      name: "Tom Delonge",
      age: 41,
      location: "California"
    },
    {
      name: "Travis Barker",
      age: 41,
      location: "California"
    }
  ];
  files: File[];
  mapped: File[];
  counter = 0;
  todos$ = this.store.select<any[]>("todos");

  constructor(
    private resolver: ComponentFactoryResolver,
    private fileSizePipe: FileSizePipe,
    private router: Router,
    private zone: NgZone,
    private store: Store
  ) {
    setTimeout(() => {
      this.items = [
        ...this.items,
        { name: "Matt Skiba", age: 40, location: "California" }
      ];
    }, 2000);

    this.store.set("todos", [
      { id: 1, name: "Eat dinner" },
      { id: 2, name: "Do washing" }
    ]);
  }

  ngOnInit() {
    // this.files = [
    //   { name: "logo.svg", size: 2120109, type: "image/svg" },
    //   { name: "banner.jpg", size: 18029, type: "image/jpg" },
    //   { name: "background.jpg", size: 1784562, type: "image/png" }
    // ];
    // this.mapped = this.files.map((file) => {
    //   return {
    //     name: file.name,
    //     type: file.type,
    //     size: this.fileSizePipe.transform(file.size, "mb")
    //   };
    // });

    // this.router.events
    //   .filter((event) => event instanceof NavigationEnd)
    //   .subscribe((event) =>{
    //     console.log(event);
    //   });
    this.zone.runOutsideAngular(() => {
      for (let i = 0; i < 100; i++) {
        this.counter++;
      }
      this.zone.run(() => {
        setTimeout(() => (this.counter = this.counter), 1000);
      });
    });
  }

  ngDoCheck() {
    console.log("Change detection has been run!");
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
    console.log("Login", user);
  }

  addProp() {
    this.user.email = "blink@blink-182.net";
  }

  changeName() {
    this.user.name = "Travis Barker";
  }

  changeUser() {
    this.user = {
      name: "Tom Delonge",
      age: 41,
      location: "California"
    };
  }
}
