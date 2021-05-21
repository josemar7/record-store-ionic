import { Component, OnInit } from '@angular/core';

import { ArtistsService } from './artists.service';
import { Artist } from './artist.model';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.page.html',
  styleUrls: ['./artists.page.scss'],
})
export class ArtistsPage implements OnInit {

  artists: Artist[];

  constructor(private artistsService: ArtistsService) { }

  ngOnInit() {
    this.artists = this.artistsService.getAllArtists();
  }

}
