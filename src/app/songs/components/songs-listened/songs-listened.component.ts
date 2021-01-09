import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Store } from "../../../store";
import { Song, SongsService } from "../../services/songs.services";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/map";

@Component({
  selector: "song-listened",
  // styleUrls: ['song-playlist.component.scss'],
  template: `
    <div class="songs">
      <songs-list [list]="listened$ | async" (toggle)="onToggle($event)">
        Played
      </songs-list>
    </div>
  `
})
export class SongListenedComponent implements OnInit {
  listened$: Observable<any[]>;

  constructor(private store: Store, private songsService: SongsService) {}

  ngOnInit() {
    this.listened$ = this.store
      .select("playlist")
      .filter(Boolean)
      .map((playlist: Song[]) => playlist.filter((track) => track.listened));
  }

  onToggle(event: CustomEvent): void {
    this.songsService.toggle(event);
  }
}
