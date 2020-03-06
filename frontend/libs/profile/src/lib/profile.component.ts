import { User, Profile } from '@dare-libs/api';
import { AuthFacade } from '@dare-libs/auth';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, combineLatest } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';

import { ProfileFacade } from './+state/profile.facade';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit, OnDestroy {
  profile$: Observable<Profile>;
  currentUser$: Observable<User>;
  isUser$: Subject<boolean> = new Subject();
  unsubscribe$: Subject<void> = new Subject();
  username: string;

  constructor(private facade: ProfileFacade, private authFacade: AuthFacade) {}

  ngOnInit() {
    this.profile$ = this.facade.profile$;
    this.currentUser$ = this.authFacade.user$;
    combineLatest([this.profile$, this.currentUser$])
      .pipe(
        tap(([p, u]) => {
          this.username = p.username;
        }),
        map(([p, u]) => p.username === u.username),
        takeUntil(this.unsubscribe$),
      )
      .subscribe(isUser => this.isUser$.next(isUser));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
