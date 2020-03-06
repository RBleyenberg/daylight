import { ApiService, ProfileResponse, SingleArticleResponse } from '@angular-ngrx-nx-realworld-example-app/api';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ActionsService {
  constructor(private apiService: ApiService) {}
}
