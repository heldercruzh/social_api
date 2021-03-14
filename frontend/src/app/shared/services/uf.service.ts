import { GenericService } from '../generic.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Uf } from '../models/uf';

@Injectable({
  providedIn: 'root'
})
export class UfService extends GenericService<Uf>{
  constructor(http: HttpClient) {
    super(http, 'uf');
  }
}
