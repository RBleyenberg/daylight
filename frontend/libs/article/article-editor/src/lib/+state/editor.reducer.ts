import { Article } from '@dare-libs/api';

import { Action, createReducer, on } from '@ngrx/store';
import * as EditorActions from './editor.actions';

export interface Editor {
  article: Article;
}

export interface EditorState {
  readonly editor: Editor;
}

export const editorInitialState: Editor = {
  article: {
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
};

const reducer = createReducer(
  editorInitialState,
  on(EditorActions.loadArticleSuccess, (state, action) => ({ ...state, article: action.article })),
  on(EditorActions.loadArticleFail, EditorActions.initializeArticle, () => editorInitialState),
);

export function editorReducer(state: Editor | undefined, action: Action): Editor {
  return reducer(state, action);
}
