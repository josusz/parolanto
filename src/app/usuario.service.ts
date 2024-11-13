import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { registroUsuario } from './registro-usuario';
import { loginUsuario } from './login-usuario';
import { alteracaoSenhaLink } from './alteracao-senha-link';
import { loginUsuarioResponse } from './login-usuario-response';
import { alteracaoSenha } from './alteracao-senha';
import { listaUsuariosResponse } from './lista-usuarios-response';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  avatarUsuario(): string | null {
    throw new Error('Method not implemented.');
  }

  private apiUrl = 'http://localhost:3000/usuarios';

  constructor(private http: HttpClient) { }

  registrarUsuario(usuario: registroUsuario): Observable<registroUsuario> {
    return this.http.post<registroUsuario>(`${this.apiUrl}/registro`, usuario);
  }

  logarUsuario(usuario: loginUsuario): Observable<loginUsuarioResponse> {
    return this.http.post<loginUsuarioResponse>(`${this.apiUrl}/login`, usuario);
  }

  alterarSenhaLink(usuario: alteracaoSenhaLink): Observable<alteracaoSenhaLink> {
    return this.http.post<alteracaoSenhaLink>(`${this.apiUrl}/alteracaoSenhaLink`, usuario);
  }

  alterarSenha(usuario: alteracaoSenha): Observable<alteracaoSenha> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<alteracaoSenha>(`${this.apiUrl}/alteracaoSenha`, usuario, { headers });
  }

  getNomeUsuario(): string | null {
    return localStorage.getItem('nomeUsuario');
  }

  getAvatarUsuario(): string | null {
    return localStorage.getItem('avatarUsuario');
  }

  getUsuarioAutenticado(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrl}/perfilUsuarioAutenticado`, { headers });
  }

  getUsuarioById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  atualizarAvatar(avatar: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<any>(`${this.apiUrl}/atualizarAvatar`, { avatar }, { headers });
  }

  getUsuariosTermoPesquisado(termo: string): Observable<listaUsuariosResponse> {
    return this.http.get<listaUsuariosResponse>(`${this.apiUrl}/pesquisar?termo=${termo}`);
  }
}