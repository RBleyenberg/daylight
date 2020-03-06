import { ActionsService } from '@angular-ngrx-nx-realworld-example-app/shared';
import { ProfileService } from '../profile.service';
import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, groupBy, map, mergeMap, switchMap } from 'rxjs/operators';
import * as ProfileActions from './profile.actions';

@Injectable()
export class ProfileEffects {
  getProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.getProfile),
      groupBy(action => action.id),
      mergeMap(group =>
        group.pipe(
          map(action => action.id),
          switchMap(username =>
            this.profileService.getProfile(username).pipe(
              map(profile => ProfileActions.getProfileSuccess({ profile })),
              catchError(error => of(ProfileActions.getProfileFail({ error }))),
            ),
          ),
        ),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private actionsService: ActionsService,
    private profileService: ProfileService,
  ) {}
}
