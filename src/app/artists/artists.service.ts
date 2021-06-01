import { delay, map, take, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Artist } from './artist.model';

@Injectable({
  providedIn: 'root',
})
export class ArtistsService {
  private _artists = new BehaviorSubject<Artist[]>([
    {
      id: 'a1',
      name: 'Lou Reed',
      imageUrl:
        'https://rockfm-cdnmed.agilecontent.com/resources/jpg/9/8/1589303391289.jpg',
      records: ['Berlin', 'Transformer'],
    },
    {
      id: 'a2',
      name: 'Patsy Cline',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/2/27/Patsy_Cline_1957--Front.jpg',
      records: ['The Patsy Cline collection', 'Showcase'],
    },
  ]);

  get artists() {
    return this._artists.asObservable();
  }

  constructor() {}

  getAllArtists() {
    return this.artists.pipe(
      take(1),
      delay(1000),
      tap((artists) => {
        this._artists.next(artists);
      })
    );
  }

  getArtist(id: string) {
    return this.artists.pipe(
      take(1),
      delay(1000),
      map((artists) => ({ ...artists.find((a) => a.id === id) }))
    );
  }

  deleteArtist(artistId: string) {
    return this.artists.pipe(
      take(1),
      delay(1000),
      tap((artists) => {
        this._artists.next(artists.filter((artist) => artist.id !== artistId));
      })
    );
  }
}
