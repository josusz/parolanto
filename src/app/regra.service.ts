import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { regra } from './regras';

@Injectable({
  providedIn: 'root'
})
export class RegraService {

  private apiUrl = 'http://localhost:3000/regras';

  constructor(private http: HttpClient) { }

  getRegras(idprj: number): Observable<regra[]> {
    return this.http.get<regra[]>(`${this.apiUrl}/list${idprj}`);
  }

  addRegra(regra: regra): Observable<regra> {
    return this.http.post<regra>(this.apiUrl, regra);
  }

  removeRegra(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  editRegra(regra: regra): Observable<regra> {
    return this.http.put<regra>(`${this.apiUrl}/${regra.REG_ID}`, regra);
  }
}
