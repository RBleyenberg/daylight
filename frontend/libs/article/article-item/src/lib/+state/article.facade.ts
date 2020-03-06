import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as ArticleActions from './article.actions';
import { ArticleState } from './article.reducer';
import { articleQuery } from './article.selectors';

@Injectable()
export class ArticleFacade {
  article$ = this.store.select(articleQuery.getArticleData);
  comments$ = this.store.select(articleQuery.getComments);
  articleLoaded$ = this.store.select(articleQuery.getArticleLoaded);
  authorUsername$ = this.store.select(articleQuery.getAuthorUsername);

  constructor(private store: Store<ArticleState>) {}

  loadArticle(slug: string) {
    this.store.dispatch(ArticleActions.loadArticle({ slug }));
  }
  loadComments(slug: string) {
    this.store.dispatch(ArticleActions.loadComments({ slug }));
  }
  delete(slug: string) {
    this.store.dispatch(ArticleActions.deleteArticle({ slug }));
  }
  deleteComment(data: { commentId: number; slug: string }) {
    this.store.dispatch(ArticleActions.deleteComment(data));
  }
  submit(slug: string) {
    this.store.dispatch(ArticleActions.addComment({ slug }));
  }
  initializeArticle() {
    this.store.dispatch(ArticleActions.initializeArticle());
  }
}
