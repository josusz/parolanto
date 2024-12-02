import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { conlang } from './lista-geral';
import { projeto_detail } from './projeto_detail';
import { listaConlangsResponse } from './lista-conlangs-response';
import { conlang_full } from './conlang';

@Injectable({
  providedIn: 'root'
})
export class ConlangsService {

  private apiUrl = 'http://localhost:3000/conlangs';

  constructor(private http: HttpClient) { }

  getConlangs(): Observable<conlang[]> {
    return this.http.get<conlang[]>(`${this.apiUrl}/conlangs`);
  }
  getConlangsFromUser(nome: string): Observable<conlang_full[]> {
    return this.http.get<conlang_full[]>(`${this.apiUrl}/usersconlangs${nome}`);
  }

  detailConlang(id:number): Observable<projeto_detail> {
    return this.http.get<projeto_detail>(`${this.apiUrl}/${id}`);
  
  }

  getConlangsTermoPesquisado(termo: string): Observable<listaConlangsResponse> {
    return this.http.get<listaConlangsResponse>(`${this.apiUrl}/pesquisar?termo=${termo}`);
  }

  getProjetosFeed(ordem: string = 'aleatorio'): Observable<listaConlangsResponse> {
    return this.http.get<listaConlangsResponse>(`${this.apiUrl}/feed?ordem=${ordem}`);
  }  

  addConlang(conlang: conlang_full): Observable<conlang_full>{
    return this.http.post<conlang_full>(this.apiUrl, conlang);
  }
}
