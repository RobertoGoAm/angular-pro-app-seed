import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Mail } from "../../models/mail.interface";
import "rxjs/add/operator/pluck";

@Component({
  selector: "mail-view",
  styleUrls: ["mail-view.component.scss"],
  template: ` <div class="mail-view">
    <h2>{{ (message | async).from }}</h2>
    <p>{{ (message | async).full }}</p>
    <div class="mail-reply">
      <textarea
        (change)="updateReply($event.target.value)"
        placeholder="Type your reply..."
        [value]="reply"
      >
      </textarea>

      <button type="button" (click)="sendReply()">Send</button>
    </div>
  </div>`
})
export class MailViewComponent implements OnInit {
  message: Observable<Mail> = this.route.data.pluck("message");
  reply: string = "";
  hasUnsavedChanges = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(() => {
      this.reply = "";
      this.hasUnsavedChanges = false;
    });
  }

  updateReply(value: string) {
    this.reply = value;
    this.hasUnsavedChanges = true;
  }

  sendReply() {
    console.log("Sent!", this.reply);
    this.hasUnsavedChanges = false;
  }
}
