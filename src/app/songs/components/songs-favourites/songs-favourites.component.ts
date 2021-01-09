import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Store } from "../../../store";
import { Song, SongsService } from "../../services/songs.services";

@Component({
  selector: "song-favourites",
  // styleUrls: ['song-playlist.component.scss'],
  template: `
    <div class="songs">
      <songs-list [list]="favourites$ | async" (toggle)="onToggle($event)">
        Favourites
      </songs-list>
    </div>
  `
})
export class SongFavouritesComponent implements OnInit {
  favourites$: Observable<any[]>;

  constructor(private store: Store, private songsService: SongsService) {}

  ngOnInit() {
    this.favourites$ = this.store
      .select("playlist")
      .filter(Boolean)
      .map((playlist: Song[]) => playlist.filter((track) => track.favourite));
  }

  onToggle(event: CustomEvent): void {
    this.songsService.toggle(event);
  }
}
