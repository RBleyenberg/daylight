import { ArticleService } from '../article.service';
import { ActionsService } from '@dare-libs/shared';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, exhaustMap, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import * as ArticleActions from './article.actions';

import { NgrxFormsFacade, setErrors, resetForm } from '@dare-libs/ngrx-forms';
import { go } from '@dare-libs/ngrx-router';

@Injectable()
export class ArticleEffects {
  loadArticle = createEffect(() =>
    this.actions$.pipe(
      ofType(ArticleActions.loadArticle),
      concatMap(action =>
        this.articleService.getArticle(action.slug).pipe(
          map(response => ArticleActions.loadArticleSuccess({ article: response.article })),
          catchError(error => of(ArticleActions.loadArticleFail(error))),
        ),
      ),
    ),
  );

  deleteArticle = createEffect(() =>
    this.actions$.pipe(
      ofType(ArticleActions.deleteArticle),
      concatMap(action =>
        this.articleService.deleteArticle(action.slug).pipe(
          map(_ => go({ to: { path: ['/'] } })),
          catchError(error => of(ArticleActions.deleteArticleFail(error))),
        ),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private articleService: ArticleService,
    private actionsService: ActionsService,
    private ngrxFormsFacade: NgrxFormsFacade,
  ) {}
}
