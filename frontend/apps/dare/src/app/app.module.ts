import { ApiModule } from '@dare-libs/api';
import { AuthModule } from '@dare-libs/auth';
import { NgrxErrorModule } from '@dare-libs/ngrx-error';
import { NgrxRouterModule } from '@dare-libs/ngrx-router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NxModule } from '@nrwl/angular';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { FooterComponent } from './layout/footer/footer.component';
import { NavbarComponent } from './layout/navbar/navbar.component';

@NgModule({
  imports: [
    ApiModule,
    AuthModule,
    BrowserModule,
    NxModule.forRoot(),
    RouterModule.forRoot(
      [
        {
          path: '',
          loadChildren: () => import('@dare-libs/article/article-home/src/lib/home.module').then(m => m.HomeModule),
        },
        {
          path: 'article/:slug',
          loadChildren: () =>
            import('@dare-libs/article/article-item/src/lib/article.module').then(m => m.ArticleModule),
        },
        {
          path: 'settings',
          loadChildren: () => import('@dare-libs/settings/src/lib/settings.module').then(m => m.SettingsModule),
        },
        {
          path: 'editor',
          loadChildren: () =>
            import('@dare-libs/article/article-editor/src/lib/editor.module').then(m => m.EditorModule),
        },
        {
          path: 'profile/:username',
          loadChildren: () => import('@dare-libs/profile/src/lib/profile.module').then(m => m.ProfileModule),
        },
      ],
      {
        initialNavigation: 'enabled',
        useHash: true,
      },
    ),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    NgrxRouterModule,
    NgrxErrorModule,
  ],
  declarations: [AppComponent, FooterComponent, NavbarComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
