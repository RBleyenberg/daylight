import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';

import { HomeService } from '../home.service';

@Injectable()
export class HomeEffects {
 
  constructor(private actions$: Actions, private homeService: HomeService) {}
  
}
