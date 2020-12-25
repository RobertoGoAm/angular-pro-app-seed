import { Component } from "@angular/core";
import { Store } from "../../../store";

@Component({
  selector: "song-playlist",
  // styleUrls: ['song-playlist.component.scss'],
  template: ` <div class="songs">Playlist</div> `
})
export class SongPlaylistComponent {
  constructor(private store: Store) {}
}
