import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Pessoa } from '../models/pessoa';
import { Relatorio } from '../payloader/relatorio';
import { Email } from '../payloader/email';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class EmailService {
  
  constructor(public http: HttpClient) { }


  enviar(destinatario: string[], assunto: string, texto: string) : Observable<string> {
    var email: Email = new Email(destinatario, assunto, texto);
    return this.http.post<string>(`${environment.apiUrl}/email-send`, email);
  }
  
}
