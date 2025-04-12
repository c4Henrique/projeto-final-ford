import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../model/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient)
  private url = "http://localhost:3000"
  
  auth(username: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.url}/login`, { nome: username, senha: password })
  }
}
