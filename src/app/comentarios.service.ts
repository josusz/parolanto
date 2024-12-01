import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Comentario } from './comentario';

@Injectable({
  providedIn: 'root',
})
export class ComentariosService {
  private apiUrl = 'http://localhost:3000/comentarios';

  constructor(private http: HttpClient) { }

  adicionarComentario(idProjeto: number, conteudo: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post(`${this.apiUrl}`, { idProjeto, conteudo }, { headers });
  }

  listarComentarios(idProjeto: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${idProjeto}`);
  }

  excluirComentario(idComentario: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.delete(`${this.apiUrl}/${idComentario}`, { headers });
  }

  contarComentarios(idProjeto: number): Observable<number> {
    return this.http.get<{ totalComentarios: number }>(`${this.apiUrl}/${idProjeto}/contar`).pipe(
      map(response => response.totalComentarios)
    );
  }

  listarComentariosUsuarioAutenticado(): Observable<{ comentarios: Comentario[] }> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<{ comentarios: Comentario[] }>(`${this.apiUrl}/projetos-usuario-autenticado/comentarios`, { headers });
  }  
}