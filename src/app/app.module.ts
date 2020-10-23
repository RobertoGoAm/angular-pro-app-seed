import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { Store } from 'store';

// feature modules

// containers
import { AppComponent } from './app.component';
import { AuthFormModule } from './auth-form/auth-form.module';
import { AuthRememberComponent } from './auth-form/auth-remember.component';
import { ExampleOneComponent } from './one/one.component';
import { ExampleTwoComponent } from './two/two.component';
import { ExampleThreeComponent } from './three/three.component';

// components

// routes
export const ROUTES: Routes = [];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    AuthFormModule,
  ],
  declarations: [
    AppComponent,
    AuthRememberComponent,
    ExampleOneComponent,
    ExampleTwoComponent,
    ExampleThreeComponent,
  ],
  providers: [
    Store
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
