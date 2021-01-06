import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Store } from "../../../store";
import { SongsService } from "../../services/songs.services";

@Component({
  selector: "song-favourites",
  // styleUrls: ['song-playlist.component.scss'],
  template: `
    <div class="songs">
      <div *ngFor="let item of favourites$ | async">
        {{ item.artist }}
        {{ item.track }}
      </div>
    </div>
  `
})
export class SongFavouritesComponent implements OnInit {
  favourites$: Observable<any[]>;

  constructor(private store: Store, private songsService: SongsService) {}

  ngOnInit() {
    this.favourites$ = this.store.select("playlist");
  }
}
