import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DefinicaoService {

  private apiUrl = 'http://localhost:3000/definicoes';

  constructor(private http: HttpClient) { }

  countEntries(idvoc: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/${idvoc}`);
  }
}
