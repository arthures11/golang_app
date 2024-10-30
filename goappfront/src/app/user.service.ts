import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }
  
  // private getAuthHeaders(): HttpHeaders {
  //   const token = localStorage.getItem('token');
  //   return new HttpHeaders({
  //     'Authorization': `Bearer ${token}`
  //   });


  // }

  login(email: string, password: string, grecaptcha: string, twoFACode: string): Observable<any> {
    console.log('Login URL:', '/api/login');
    return this.http.post('/api/login', { email, password, grecaptcha, twoFACode });
  }

  register(email: string, password: string, name: string): Observable<any> {
    return this.http.post('/api/register', { email, password, name });
  }

  // getUserInfo(): Observable<any> {
  //   return this.http.get('/api/user',  { headers: this.getAuthHeaders() });
  // }
  // getUserInfo(): Observable<any> {
  //   return this.http.get('/api/user', { withCredentials: true });
  // }

  getUserInfo(): Observable<any> {
    return this.http.get('/api/user');
  }
  
}