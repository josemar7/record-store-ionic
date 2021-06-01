import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';

import { ArtistsService } from './artists.service';
import { Artist } from './artist.model';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.page.html',
  styleUrls: ['./artists.page.scss'],
})
export class ArtistsPage implements OnInit, OnDestroy {
  artists: Artist[];
  private artistsSub: Subscription;

  constructor(
    private artistsService: ArtistsService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.artistsSub = this.artistsService.artists.subscribe((artists) => {
      this.artists = artists;
    });
  }

  ngOnDestroy() {
    if (this.artistsSub) {
      this.artistsSub.unsubscribe();
    }
  }

  ionViewWillEnter() {
    this.loadingCtrl
      .create({ message: 'Loading Artist...' })
      .then((loadingEl) => {
        loadingEl.present();
        this.artistsService.getAllArtists().subscribe(() => {
          loadingEl.dismiss();
        });
      });
  }
}
