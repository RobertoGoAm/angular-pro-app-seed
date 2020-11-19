import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";

import { MailFolderComponent } from "./containers/mail-folder/mail-folder.component";
import { MailItemComponent } from "./components/mail-item/mail-item.component";
import { MailAppComponent } from "./components/mail-app/mail-app.component";
import { MailService } from "./mail.service";
import { MailFolderResolve } from "./containers/mail-folder/mail-folder.resolve";
import { MailViewComponent } from "./components/mail-view/mail-view.component";
import { MailViewResolve } from "./components/mail-view/mail-view.resolve";
import { AuthModule } from "../auth/auth.module";
import { AuthGuard } from "../auth/auth.guard";

export const ROUTES: Routes = [
  {
    path: "mail",
    component: MailAppComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "folder/:name",
        component: MailFolderComponent,
        resolve: {
          messages: MailFolderResolve
        }
      },
      {
        path: "message/:id",
        component: MailViewComponent,
        outlet: "pane",
        resolve: {
          message: MailViewResolve
        }
      }
    ]
  }
];

@NgModule({
  imports: [CommonModule, AuthModule, RouterModule.forChild(ROUTES)],
  declarations: [
    MailFolderComponent,
    MailAppComponent,
    MailItemComponent,
    MailViewComponent
  ],
  exports: [MailAppComponent],
  providers: [MailService, MailFolderResolve, MailViewResolve]
})
export class MailModule {}
