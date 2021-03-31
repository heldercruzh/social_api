
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../shared/models/user';
import { AppConstants } from '../shared/app.constants';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  /*
  public login(email: string, senha: string): Observable<Usuario> {
    return this.http.post<Usuario>(`${environment.apiUrl}/auth/login`, { email, senha }, httpOptions);
  }*/

  public login(credentials: any): Observable<any> {
    return this.http.post(AppConstants.AUTH_API + 'login', {
      email: credentials.email,
      password: credentials.password
    }, httpOptions);
  }

  public register(user: User): Observable<any> {
    return this.http.post(AppConstants.AUTH_API + 'signup', user, httpOptions);
  }
  
  public keycloak() {

    var client_id: string = 'login-app'; // client_id:<your_client_id>
    var username: string = 'user1'; // username:<your_username> 
    var password: string = '123'; // password:<your_password>
    var grant_type: string = 'zaq1! QAZ'; //grant_type:password

    const httpOptionsKeycloak = {
      headers: new HttpHeaders({ 
        'Content-Type': 'x-www-form-urlencoded',
        
    })
    };


    //http://localhost:8180/auth/realms/SpringBootKeycloak/protocol/openid-connect/token
    return this.http.post('http://localhost:8180/auth/realms/SpringBootKeycloak/protocol/openid-connect/token', {username, password, client_id, grant_type}, httpOptionsKeycloak);
  }

  
}
