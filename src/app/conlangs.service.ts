import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { conlang } from './lista-geral';
import { projeto_detail } from './projeto_detail';

@Injectable({
  providedIn: 'root'
})
export class ConlangsService {

  private apiUrl = 'http://localhost:3000/conlangs';

  constructor(private http: HttpClient) { }

  getConlangs(): Observable<conlang[]> {
    return this.http.get<conlang[]>(`${this.apiUrl}/conlangs`);
  
  }
  detailConlang(id:number): Observable<projeto_detail> {
    return this.http.get<projeto_detail>(`${this.apiUrl}/${id}`);
  
  }

  getConlangsTermoPesquisado(termo: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/pesquisar?termo=${termo}`);
  }
}
