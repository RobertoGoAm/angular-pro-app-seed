import { Component } from "@angular/core";
import { Store } from "../../../store";

@Component({
  selector: "song-listened",
  // styleUrls: ['song-playlist.component.scss'],
  template: ` <div class="songs">Listened</div> `
})
export class SongListenedComponent {
  constructor(private store: Store) {}
}
