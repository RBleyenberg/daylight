import { Observable, Subject } from 'rxjs';
import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { ArticleListConfig } from '@angular-ngrx-nx-realworld-example-app/article-list';
import { articleListInitialState, ArticleListFacade } from '@angular-ngrx-nx-realworld-example-app/article-list';
import { AuthFacade } from '@angular-ngrx-nx-realworld-example-app/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, OnDestroy {
  listConfig$: Observable<ArticleListConfig>;
  isAuthenticated: boolean;
  unsubscribe$: Subject<void> = new Subject();

  constructor(
    private articleListFacade: ArticleListFacade,
    private authFacade: AuthFacade,
  ) {}

  ngOnInit() {
    this.authFacade.isLoggedIn$.pipe(takeUntil(this.unsubscribe$)).subscribe(isLoggedIn => {
      this.isAuthenticated = isLoggedIn;
      this.getArticles();
    });
    this.listConfig$ = this.articleListFacade.listConfig$;
  }

  setListTo(type: string = 'ALL') {
    this.articleListFacade.setListConfig(<ArticleListConfig>{
      ...articleListInitialState.listConfig,
      type,
    });
  }

  getArticles() {
    if (this.isAuthenticated) {
      this.setListTo('FEED');
    } else {
      this.setListTo('ALL');
    }
  }

  setListTag(tag: string) {
    this.articleListFacade.setListConfig(<ArticleListConfig>{
      ...articleListInitialState.listConfig,
      filters: {
        ...articleListInitialState.listConfig.filters,
        tag,
      },
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
