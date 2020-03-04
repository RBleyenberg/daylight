import { Action, createReducer } from '@ngrx/store';

export interface HomeState {
  readonly home: Home;
}

export interface Home {}

export const homeInitialState: Home = {};

const reducer = createReducer(homeInitialState);

export function homeReducer(state: Home | undefined, action: Action): Home {
  return reducer(state, action);
}
