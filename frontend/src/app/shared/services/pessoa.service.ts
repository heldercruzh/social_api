import { GenericService } from '../generic.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Pessoa } from '../models/pessoa';
import { Uf } from '../models/uf';
import { Municipio } from '../models/municipio';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class PessoaService extends GenericService<Pessoa>{
  constructor(http: HttpClient) {
    super(http, 'pessoa');
  }

  public consultar(cpf: string, nome: string, idUf: string, idMunicipio: string): Observable<Pessoa[]> {

    const headers = new HttpHeaders().append('Content-Type', 'application/json');
    const params = new HttpParams()
    .append('cpf',cpf)
    .append('nome', nome)
    .append('uf', idUf)
    .append('municipio', idMunicipio);

    return this.http.get<Pessoa[]>(environment.apiUrl+'/pessoa/consulta', {headers, params});

  }

}
