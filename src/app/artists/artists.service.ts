import { Injectable } from '@angular/core';

import { Artist } from './artist.model';

@Injectable({
  providedIn: 'root'
})
export class ArtistsService {

  private artists: Artist[] = [
    {
      id: 'a1',
      name: 'Lou Reed',
      imageUrl: 'https://rockfm-cdnmed.agilecontent.com/resources/jpg/9/8/1589303391289.jpg',
      records: ['Berlin', 'Transformer']
    },
    {
      id: 'a2',
      name: 'Patsy Cline',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/27/Patsy_Cline_1957--Front.jpg',
      records: ['The Patsy Cline collection', 'Showcase']
    }
  ];

  constructor() { }

  getAllArtists() {
    return [...this.artists];
  }

  getArtist(artistId: string) {
    return {...this.artists.find(artist => artist.id === artistId)};
  }

  deleteArtist(artistId: string) {
    this.artists = this.artists.filter(artist => artist.id !== artistId);
  }

}
