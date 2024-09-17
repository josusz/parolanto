import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { registroUsuario } from './registro-usuario';
import { loginUsuario } from './login-usuario';
import { alterarSenha } from './alterar-senha-usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = 'http://localhost:3000/usuarios';

  constructor(private http: HttpClient) { }

  registrarUsuario(usuario: registroUsuario): Observable<registroUsuario> {
    return this.http.post<registroUsuario>(`${this.apiUrl}/registro`, usuario);
  }

  logarUsuario(usuario: loginUsuario): Observable<loginUsuario> {
    return this.http.post<loginUsuario>(`${this.apiUrl}/login`, usuario);
  }

  alterarSenha(usuario: alterarSenha): Observable<null> {
    // método vazio, sem implementação por enquanto
    return new Observable<null>(observer => {
      observer.next(null);
      observer.complete();
    });
  }
}