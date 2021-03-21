import { GenericService } from '../generic.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { AppConstants } from '../../shared/app.constants';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService extends GenericService<Usuario>{
  constructor(http: HttpClient) {
    super(http, 'usuario');
  }

  public getUser(): Observable<any> {
    return this.http.get<any>(AppConstants.URL_API + 'user/user', { responseType: 'text' as 'json'});
  }

  public getAdmin(): Observable<any> {
    return this.http.get<any>(AppConstants.URL_API + 'user/admin', { responseType: 'text' as 'json'});
  }
}
