import { ArticleListModule } from '@angular-ngrx-nx-realworld-example-app/article-list';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    CommonModule,
    ArticleListModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: HomeComponent,
        resolve: {},
      },
    ]),
  ],
  declarations: [HomeComponent],
  providers: [],
})
export class HomeModule {}
