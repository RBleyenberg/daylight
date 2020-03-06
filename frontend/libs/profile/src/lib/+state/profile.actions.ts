import { createAction, props } from '@ngrx/store';
import { Profile } from '@dare-libs/api';

export const getProfile = createAction('[profile] GET_PROFILE', props<{ id: string }>());
export const getProfileSuccess = createAction('[profile] GET_PROFILE_SUCCESS', props<{ profile: Profile }>());
export const getProfileFail = createAction('[profile] GET_PROFILE_FAIL', props<{ error: Error }>());
