import { ApiService, ProfileResponse, SingleArticleResponse } from '@dare-libs/api';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ActionsService {
  constructor(private apiService: ApiService) {}
}
