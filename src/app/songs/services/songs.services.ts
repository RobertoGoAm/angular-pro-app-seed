import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Store } from "src/app/store";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import { Observable } from "rxjs";

export interface Song {
  id: number;
  artist: string;
  track: string;
  listened: boolean;
  favourite: boolean;
}

@Injectable()
export class SongsService {
  getPlaylist$: Observable<Song[]> = this.http
    .get("/api/playlist")
    .map((res) => res.json())
    .do((next) => this.store.set("playlist", next));

  constructor(private http: Http, private store: Store) {}

  toggle(event: any) {
    console.log(event);
  }
}
