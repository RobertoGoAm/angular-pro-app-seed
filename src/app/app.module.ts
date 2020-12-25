import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import {
  Routes,
  RouterModule,
  PreloadAllModules,
  PreloadingStrategy,
  Route
} from "@angular/router";

// import { Store } from "store";

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
import { AuthGuard } from "./auth/auth.guard";
import { PizzaViewerComponent } from "./containers/pizza-viewer.component";
import { SideViewerComponent } from "./containers/side-viewer.component";
import { DrinkViewerComponent } from "./containers/drink-viewer.component";
import { API_TOKEN } from "./token";
import { FoodStoreModule } from "./food-store/food-store.module";
import { Store } from "./store";
import { SongsModule } from "./songs/songs.module";

export class CustomPreload implements PreloadingStrategy {
  preload(route: Route, fn: () => Observable<any>): Observable<any> {
    return route.data && route.data.preload ? fn() : of(null);
  }
}

// routes
export const ROUTES: Routes = [
  {
    path: "dashboard",
    canLoad: [AuthGuard],
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
    MailModule,
    FoodStoreModule.forRoot({
      storeId: 10292,
      storeToken: "eca938c99a0e9ff91029c"
    }),
    SongsModule
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
    FileSizePipe,
    PizzaViewerComponent,
    SideViewerComponent,
    DrinkViewerComponent
  ],
  providers: [
    Store,
    CustomPreload,
    { provide: API_TOKEN, useValue: "/api/pizzas" }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
