import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient)
  private url = "http://localhost:3000"
  
  auth(username: string, password: string) {
    return this.http.post(`${this.url}/login`, { nome: username, senha: password })
  }
}
