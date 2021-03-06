import { NgrxFormsModule } from '@dare-libs/ngrx-forms';
import { SharedModule } from '@dare-libs/shared';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { ArticleEffects } from './+state/article.effects';
import { ArticleFacade } from './+state/article.facade';
import { articleInitialState, articleReducer } from './+state/article.reducer';
import { ArticleGuardService } from './article-guard.service';
import { ArticleMetaComponent } from './article-meta/article-meta.component';
import { ArticleComponent } from './article.component';
import { ArticleService } from './article.service';
import { MarkdownPipe } from './markdown.pipe';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ArticleComponent,
        canActivate: [ArticleGuardService],
      },
    ]),
    StoreModule.forFeature('article', articleReducer, {
      initialState: articleInitialState,
    }),
    EffectsModule.forFeature([ArticleEffects]),
    NgrxFormsModule,
    SharedModule,
  ],
  providers: [ArticleEffects, ArticleService, ArticleGuardService, ArticleFacade],
  declarations: [ArticleComponent, ArticleMetaComponent, MarkdownPipe],
})
export class ArticleModule {}
