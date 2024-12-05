import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { exemplo } from './exemplos';

@Injectable({
  providedIn: 'root'
})
export class ExemploService {
  private apiUrl = 'http://localhost:3000/exemplos';

  constructor(private http: HttpClient) { }

  countEntries(idvoc: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count${idvoc}`);
  }
  getEx(idvoc: number): Observable<exemplo[]> {
    return this.http.get<exemplo[]>(`${this.apiUrl}/list${idvoc}`);
  }

  addEx(ex: exemplo): Observable<exemplo> {
    return this.http.post<exemplo>(this.apiUrl, ex);
  }

  removeEx(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
