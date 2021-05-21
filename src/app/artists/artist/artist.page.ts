import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { Artist } from './../artist.model';
import { ArtistsService } from './../artists.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.page.html',
  styleUrls: ['./artist.page.scss'],
})
export class ArtistPage implements OnInit {

  loadedArtist: Artist;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private artistsService: ArtistsService,
    private alertCtrl: AlertController) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('artistId')) {
        this.router.navigate(['/artists']);
        return;
      }
      this.loadedArtist = this.artistsService.getArtist(paramMap.get('artistId'));
    });
  }

  onArtistRecipe() {
    this.alertCtrl.create({
      header: 'Are you sure?',
      message: 'Do you really want to delete the artist?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel'
      }, {
        text: 'Delete',
        handler: () => {
          this.artistsService.deleteArtist(this.loadedArtist.id);
          this.router.navigate(['/artists']);
        }
      }]
    }).then(alertEl => {
      alertEl.present();
    });
  }

}
