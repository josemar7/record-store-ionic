import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'artists',
    pathMatch: 'full'
  },
  {
    path: 'artists',
    children: [
      {
        path: '',
        loadChildren: () => import('./artists/artists.module').then( m => m.ArtistsPageModule)
      },
      {
        path: ':artistId',
        loadChildren: () => import('./artists/artist/artist.module').then( m => m.ArtistPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
