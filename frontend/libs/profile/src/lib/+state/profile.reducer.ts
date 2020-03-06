import { createFeatureSelector, Action, createReducer, on } from '@ngrx/store';
import { Profile } from '@dare-libs/api';
import * as ProfileActions from './profile.actions';

export interface ProfileState {
  readonly profile: Profile;
}

export const profileInitialState: Profile = {
  username: '',
  loading: false,
};

export const getProfile = createFeatureSelector<Profile>('profile');

const reducer = createReducer(
  profileInitialState,
  on(ProfileActions.getProfile, (state, action) => ({ ...state, loading: true })),
  on(ProfileActions.getProfileSuccess, (state, action) => ({ ...action.profile, loading: false })),
  on(ProfileActions.getProfileFail, (state, action) => profileInitialState),
);

export function profileReducer(state: Profile | undefined, action: Action): Profile {
  return reducer(state, action);
}
