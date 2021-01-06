import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpModule } from "@angular/http";
import { SongFavouritesComponent } from "./components/songs-favourites/songs-favourites.component";
import { SongListenedComponent } from "./components/songs-listened/songs-listened.component";
import { SongPlaylistComponent } from "./components/songs-playlist/songs-playlist.component";
import { SongsService } from "./services/songs.services";
import { SongsListComponent } from "./components/songs-list/songs-list.component";

@NgModule({
  imports: [CommonModule, HttpModule],
  declarations: [
    SongFavouritesComponent,
    SongListenedComponent,
    SongPlaylistComponent,
    SongsListComponent
  ],
  exports: [
    SongFavouritesComponent,
    SongListenedComponent,
    SongPlaylistComponent
  ],
  providers: [SongsService]
})
export class SongsModule {}
