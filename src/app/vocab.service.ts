import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { vocabulo } from './vocab';
import { vocab_detail } from './vocab_detail';

@Injectable({
  providedIn: 'root'
})
export class VocabService {
  private apiUrl = 'http://localhost:3000/vocab';

  constructor(private http: HttpClient) { }

  getVocab(idprj: number): Observable<vocabulo[]> {
    return this.http.get<vocabulo[]>(`${this.apiUrl}/${idprj}`);
  }

  addWord(word: vocabulo): Observable<vocabulo> {
    return this.http.post<vocabulo>(this.apiUrl, word);
  }

  removeWord(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  editWord(word: vocabulo): Observable<vocabulo> {
    return this.http.put<vocabulo>(`${this.apiUrl}/${word.VOC_ID}`, word);
  }
  detailWord(id:number): Observable<vocab_detail> {
    return this.http.get<vocab_detail>(`${this.apiUrl}/${id}`);
  
  }

}
