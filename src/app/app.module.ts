import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import {
  Routes,
  RouterModule,
  PreloadAllModules,
  PreloadingStrategy,
  Route
} from "@angular/router";

import { Store } from "store";

// feature modules

// containers
import { AppComponent } from "./app.component";
import { AuthFormModule } from "./auth-form/auth-form.module";
import { AuthRememberComponent } from "./auth-form/auth-remember.component";
import { ExampleOneComponent } from "./one/one.component";
import { ExampleTwoComponent } from "./two/two.component";
import { ExampleThreeComponent } from "./three/three.component";
import { CreditCardDirective } from "./credit-card/credit-card.directive";
import { TooltipDirective } from "./tooltip/tooltip.directive";
import { MyForDirective } from "./my-for/my-for.directive";
import { FileSizePipe } from "./filesize.pipe";
import { StockInventoryModule } from "./stock-inventory/stock-inventory.module";
import { MailModule } from "./mail/mail.module";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";

export class CustomPreload implements PreloadingStrategy {
  preload(route: Route, fn: () => Observable<any>): Observable<any> {
    return route.data && route.data.preload ? fn() : of(null);
  }
}

// routes
export const ROUTES: Routes = [
  {
    path: "dashboard",
    data: { preload: true },
    loadChildren: "./dashboard/dashboard.module#DashboardModule"
  },
  { path: "**", redirectTo: "mail/folder/inbox" }
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES, { preloadingStrategy: CustomPreload }),
    AuthFormModule,
    StockInventoryModule,
    MailModule
  ],
  declarations: [
    AppComponent,
    AuthRememberComponent,
    ExampleOneComponent,
    ExampleTwoComponent,
    ExampleThreeComponent,
    CreditCardDirective,
    TooltipDirective,
    MyForDirective,
    FileSizePipe
  ],
  providers: [Store, CustomPreload],
  bootstrap: [AppComponent]
})
export class AppModule {}
