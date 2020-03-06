import { createAction, props } from '@ngrx/store';
import { Article, Profile } from '@dare-libs/api';

export const loadArticle = createAction('[article] LOAD_ARTICLE', props<{ slug: string }>());

export const loadArticleSuccess = createAction('[article] LOAD_ARTICLE_SUCCESS', props<{ article: Article }>());

export const loadArticleFail = createAction('[article] LOAD_ARTICLE_FAIL', props<{ error: Error }>());

export const deleteArticle = createAction('[article] DELETE_ARTICLE', props<{ slug: string }>());

export const deleteArticleFail = createAction('[article] DELETE_ARTICLE_FAIL', props<{ error: Error }>());

export const initializeArticle = createAction('[article] INITIALIZE_ARTICLE');
