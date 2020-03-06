import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageJwtService {
  getItem(): Observable<string | null> {
    const data = localStorage.getItem('dare-authentication-token');
    if (data) {
      return of(data);
    }
    return of(null);
  }

  setItem(data: string): Observable<string> {
    localStorage.setItem('dare-authentication-token', data);
    return of(data);
  }

  removeItem(): Observable<boolean> {
    localStorage.removeItem('dare-authentication-token');
    return of(true);
  }
}
