import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { homeQuery } from './home.selectors';
import { HomeState } from './home.reducer';

@Injectable()
export class HomeFacade {

  home$ = this.store.select(homeQuery.getHome);

  constructor(private store: Store<HomeState>) {}


}
