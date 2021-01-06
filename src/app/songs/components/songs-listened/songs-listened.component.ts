import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Store } from "../../../store";
import { SongsService } from "../../services/songs.services";

@Component({
  selector: "song-listened",
  // styleUrls: ['song-playlist.component.scss'],
  template: `
    <div class="songs">
      <div *ngFor="let item of listened$ | async">
        {{ item.artist }}
        {{ item.track }}
      </div>
    </div>
  `
})
export class SongListenedComponent implements OnInit {
  listened$: Observable<any[]>;

  constructor(private store: Store, private songsService: SongsService) {}

  ngOnInit() {
    this.listened$ = this.store.select("playlist");
  }
}
