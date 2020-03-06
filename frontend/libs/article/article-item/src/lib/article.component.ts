import { Article, User } from '@angular-ngrx-nx-realworld-example-app/api';
import { AuthFacade } from '@angular-ngrx-nx-realworld-example-app/auth';
import { NgrxFormsFacade } from '@angular-ngrx-nx-realworld-example-app/ngrx-forms';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, combineLatest } from 'rxjs';
import { ArticleFacade } from './+state/article.facade';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleComponent implements OnInit, OnDestroy {

  article$: Observable<Article>;
  canModify = false;
  isAuthenticated$: Observable<boolean>;
  data$: Observable<any>;
  unsubscribe$ = new Subject<void>();
  currentUser$: Observable<User>;
  touchedForm$: Observable<boolean>;

  constructor(
    private ngrxFormsFacade: NgrxFormsFacade,
    private facade: ArticleFacade,
    private auhtFacade: AuthFacade,
  ) {}

  ngOnInit() {
    this.article$ = this.facade.article$;
    this.isAuthenticated$ = this.auhtFacade.isLoggedIn$;
    this.currentUser$ = this.auhtFacade.user$;
    this.data$ = this.ngrxFormsFacade.data$;
    this.touchedForm$ = this.ngrxFormsFacade.touched$;
    this.ngrxFormsFacade.setData('');    
    this.auhtFacade.auht$
      .pipe(
        filter(auth => auth.loggedIn),
        auth$ => combineLatest([auth$, this.facade.authorUsername$]),
        takeUntil(this.unsubscribe$),
      ).subscribe(([auth, username]) => {
        this.canModify = auth.user.username === username;
      });
  }

  delete(slug: string) {
    this.facade.delete(slug);
  }
  
  updateForm(changes: any) {
    this.ngrxFormsFacade.updateData(changes);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.facade.initializeArticle();
  }
}
