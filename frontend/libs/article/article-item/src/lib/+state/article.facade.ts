import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as ArticleActions from './article.actions';
import { ArticleState } from './article.reducer';
import { articleQuery } from './article.selectors';

@Injectable()
export class ArticleFacade {
  article$ = this.store.select(articleQuery.getArticleData);
  articleLoaded$ = this.store.select(articleQuery.getArticleLoaded);
  authorUsername$ = this.store.select(articleQuery.getAuthorUsername);

  constructor(private store: Store<ArticleState>) {}

  loadArticle(slug: string) {
    this.store.dispatch(ArticleActions.loadArticle({ slug }));
  }
  delete(slug: string) {
    this.store.dispatch(ArticleActions.deleteArticle({ slug }));
  }
  initializeArticle() {
    this.store.dispatch(ArticleActions.initializeArticle());
  }
}
