import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { conlang } from './lista-geral';
import { projeto_detail } from './projeto_detail';
import { listaConlangsResponse } from './lista-conlangs-response';

@Injectable({
  providedIn: 'root'
})
export class ConlangsService {

  private apiUrl = 'http://localhost:3000/conlangs';

  constructor(private http: HttpClient) { }

  getConlangs(): Observable<conlang[]> {
    return this.http.get<conlang[]>(`${this.apiUrl}/conlangs`);
  }
  getConlangsFromUser(): Observable<conlang[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<conlang[]>(`${this.apiUrl}/usersconlangs`, { headers });
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

  addProject(projeto: conlang): Observable<conlang> {
    
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<conlang>(this.apiUrl, { projeto }, { headers });

  }

  removeProject(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  editProject(project: conlang): Observable<conlang> {
    return this.http.put<conlang>(`${this.apiUrl}/${project.PRJ_ID}`, project);
  }
}
