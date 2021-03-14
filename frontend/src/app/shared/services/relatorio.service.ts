import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Pessoa } from '../models/pessoa';
import { Relatorio } from '../payloader/relatorio';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class RelatorioService {
  
  constructor(public http: HttpClient) { }


  export(arrayDados: any, formato: string) {
    //var relatorio: Relatorio = new Relatorio(arrayDados, formato);
    return this.http.post(`${environment.apiUrl}/lista_contatos`, { arrayDados, formato }, {
        responseType: 'blob'
      });
  }


  
}
