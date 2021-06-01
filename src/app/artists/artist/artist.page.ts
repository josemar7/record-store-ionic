import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

import { Artist } from './../artist.model';
import { ArtistsService } from './../artists.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.page.html',
  styleUrls: ['./artist.page.scss'],
})
export class ArtistPage implements OnInit {
  loadedArtist: Artist;
  isLoading = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private artistsService: ArtistsService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('artistId')) {
        this.router.navigate(['/artists']);
        return;
      }
      this.isLoading = true;
      this.artistsService
        .getArtist(paramMap.get('artistId'))
        .subscribe((artist) => {
          this.loadedArtist = artist;
          this.isLoading = false;
        });
    });
  }

  onArtistRecipe() {
    this.alertCtrl
      .create({
        header: 'Are you sure?',
        message: 'Do you really want to delete the artist?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
          },
          {
            text: 'Delete',
            handler: () => {
              this.loadingCtrl
                .create({ message: 'Deleting...' })
                .then((loadingEl) => {
                  loadingEl.present();
                  this.artistsService
                    .deleteArtist(this.loadedArtist.id)
                    .subscribe(() => {
                      loadingEl.dismiss();
                      this.router.navigate(['/artists']);
                    });
                });
            },
          },
        ],
      })
      .then((alertEl) => {
        alertEl.present();
      });
  }
}
