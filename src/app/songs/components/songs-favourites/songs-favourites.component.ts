import { Component } from "@angular/core";
import { Store } from "../../../store";

@Component({
  selector: "song-favourites",
  // styleUrls: ['song-playlist.component.scss'],
  template: ` <div class="songs">Favourites</div> `
})
export class SongFavouritesComponent {
  constructor(private store: Store) {}
}
