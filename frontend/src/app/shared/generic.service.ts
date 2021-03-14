import { HttpClient, HttpHeaders } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { ReturnJson } from '../shared/return-json';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { GenericModel } from './generic.model';

/*
  The "Generic Service" is a class created to provide a default service
  to make easily to create a services for eath object that need
*/
export class GenericService<T> {
  constructor(protected http: HttpClient, private serviceEndpoint: string) { }
 
  public remove(id: number): Observable<any> {
      return this.http.delete<ReturnJson>(
        `${environment.apiUrl}/${this.serviceEndpoint}/${id}`).pipe(take(1));
  }
  
  public read(id?: number): Observable<any>{
    let url = `${environment.apiUrl}/${this.serviceEndpoint}`;
    if (id) {
      url += `/${id}`;
    }
    return this.http.get<any>(url);
  }

  public save(record: GenericModel): Observable<any> {

    if (record['id'] == null || record['id'] == 0) {
      const options = {headers: new HttpHeaders().set('Content-Type', 'application/json')};        
      return this.http.post<ReturnJson>( `${environment.apiUrl}/${this.serviceEndpoint}`, record, options).pipe(take(1));
    } else {
      return this.http.put<ReturnJson>(`${environment.apiUrl}/${this.serviceEndpoint}/${record['id']}`, record);
    }
    
  }
}
