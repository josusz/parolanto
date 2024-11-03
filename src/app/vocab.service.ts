import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { vocabulo } from './vocab';

@Injectable({
  providedIn: 'root'
})
export class VocabService {
  private apiUrl = 'http://localhost:3000/vocab';

  constructor(private http: HttpClient) { }

  getVocab(): Observable<vocabulo[]> {
    return this.http.get<vocabulo[]>(this.apiUrl);
  }

  addWord(word: vocabulo): Observable<vocabulo> {
    return this.http.post<vocabulo>(this.apiUrl, word);
  }

  removeWord(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}