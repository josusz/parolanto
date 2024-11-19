import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { definicao } from './definicao';

@Injectable({
  providedIn: 'root'
})
export class DefinicaoService {

  private apiUrl = 'http://localhost:3000/definicoes';

  constructor(private http: HttpClient) { }

  countEntries(idvoc: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count${idvoc}`);
  }
  getDefs(idvoc: number): Observable<definicao[]> {
    return this.http.get<definicao[]>(`${this.apiUrl}/list${idvoc}`);
  }

  addDef(def: definicao): Observable<definicao> {
    return this.http.post<definicao>(this.apiUrl, def);
  }

  removeDef(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  editDef(def: definicao): Observable<definicao> {
    return this.http.put<definicao>(`${this.apiUrl}/${def.DEF_ID}`, def);
  }
}
