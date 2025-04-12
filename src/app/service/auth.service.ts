import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../model/user';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient)
  private url = "http://localhost:3000"
  
  auth(username: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.url}/login`, { nome: username, senha: password })
      .pipe(
        tap(user => {
          sessionStorage.setItem("user-name", user.name)
          sessionStorage.setItem("user-email", user.name)
        })
      )
  }
}
