import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService, SingleArticleResponse } from '@dare-libs/api';

@Injectable()
export class ArticleService {
  constructor(private apiService: ApiService) {}

  getArticle(slug: string): Observable<SingleArticleResponse> {
    return this.apiService.get<SingleArticleResponse>('/articles/' + slug);
  }

  deleteArticle(slug: string): Observable<void> {
    return this.apiService.delete<void>('/articles/' + slug);
  }
}
