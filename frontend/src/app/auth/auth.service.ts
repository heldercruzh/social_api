
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Usuario } from '../shared/models/usuario';
import { User } from '../shared/models/user';
import { SocialUser } from "angularx-social-login";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User = new User;
  // public clientSecret = 'wP4RZMe0e8rNx3EmgWd0Eqnu';
  public clientId = '1018977001682-rsl0j4f0aaar7iposnq55418mfgisaf9.apps.googleusercontent.com';
  public redirectUri = 'http://localhost:4200';

  constructor(private http: HttpClient) { }

  login(email: string, senha: string): Observable<Usuario> {
    return this.http.post<Usuario>(`${environment.apiUrl}/authenticate`, { email, senha }, httpOptions);
  }

  signInSocial(socialUser: SocialUser): Observable<any> {
    //return this.http.post<Usuario>(`${environment.apiUrl}/socialLogin`, socialUser, httpOptions);

    //let params = new URLSearchParams();   
    //params.append('oauth2_auth_request', socialUser.idToken);

    this.user.name = socialUser.name;
    this.user.email = socialUser.email;
    this.user.imageUrl = socialUser.photoUrl;
    this.user.emailVerified = socialUser.email;

  
    let headers = new HttpHeaders({'Content-type': 'application/json'//'application/x-www-form-urlencoded'
               // ,'Authorization': 'Basic '+window.btoa(this.clientId+':'+this.clientSecret)
  
     });
    
   
    
    return this.http.post<any>(environment.apiUrl+'/oauth2/authorize/google?redirect_uri='+this.redirectUri,
           this.user , { headers: headers }); 



  }


/*
  retrieveToken(socialUser: SocialUser) {
    let params = new URLSearchParams();   
    params.append('grant_type',socialUser.authorizationCode);
    params.append('client_id', this.clientId);
    params.append('client_secret', this.clientSecret);
    params.append('redirect_uri', this.redirectUri);
    params.append('code',socialUser.idToken);

    let headers = 
      new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'});
       
      this.http.post('http://localhost:8080/api/oauth2/authorize/google', 
        params.toString(), { headers: headers })
        .subscribe(
          data => { console.log(data) },//this.saveToken(data) 
          
          err => { console.log('Invalid Credentials') } //alert('Invalid Credentials')); 
          );
    }
    */
}
