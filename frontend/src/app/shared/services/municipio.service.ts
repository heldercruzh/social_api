import { GenericService } from '../generic.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Municipio } from '../models/municipio';

@Injectable({
  providedIn: 'root'
})
export class MunicipioService extends GenericService<Municipio>{
  constructor(http: HttpClient) {
    super(http, 'municipio');
  }
}
