import { GenericService } from '../generic.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends GenericService<Usuario>{
  constructor(http: HttpClient) {
    super(http, 'usuario');
  }
}
