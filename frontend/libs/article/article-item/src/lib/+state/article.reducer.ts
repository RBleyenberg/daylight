import { Article } from '@angular-ngrx-nx-realworld-example-app/api';
import { Action, createReducer, on } from '@ngrx/store';
import * as ArticleActions from './article.actions';

export interface ArticleState {
  data: Article;
  loading: boolean;
  loaded: boolean;
}

export interface ArticleRootState {
  readonly article: ArticleState;
}

export const articleInitialState: ArticleState = {
  data: {
    slug: '',
    title: '',
    description: '',
    body: '',
    createdAt: '',
    updatedAt: '',
    author: {
      username: '',
      loading: false,
    },
  },
  loaded: false,
  loading: false,
};

const reducer = createReducer(
  articleInitialState,
  on(ArticleActions.loadArticleSuccess, (state, action) => ({
    ...state,
    data: action.article,
    loaded: true,
    loading: false,
  })),
  on(ArticleActions.loadArticleFail, state => ({
    ...state,
    data: articleInitialState.data,
    loaded: false,
    loading: false,
  })),
  on(ArticleActions.initializeArticle, state => articleInitialState),
  on(ArticleActions.deleteArticleFail, state => articleInitialState),
);

export function articleReducer(state: ArticleState | undefined, action: Action): ArticleState {
  return reducer(state, action);
}
