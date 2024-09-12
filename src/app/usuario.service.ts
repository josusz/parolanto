import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { registroUsuario } from './registro-usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = 'http://localhost:3000/usuarios';

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  registrarUsuario(usuario: registroUsuario): Observable<registroUsuario> {
    return this.http.post<registroUsuario>(this.apiUrl, usuario);
  }
}