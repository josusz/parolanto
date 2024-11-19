import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { projeto_detail } from '../projeto_detail';
import { ConlangsService } from '../conlangs.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { VocabService } from '../vocab.service';
import { vocabulo } from '../vocab';
import { DefinicaoService } from '../definicao.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-acessar-projeto',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './acessar-projeto.component.html',
  styleUrl: './acessar-projeto.component.css'
})
export class AcessarProjetoComponent implements OnInit {
  projeto!: projeto_detail;
  id!: number;
  words: vocabulo[] = [];
  newWord!: vocabulo;
  editingMode: boolean = false;

  constructor(private route: ActivatedRoute, private serviceConlangs: ConlangsService, private serviceVocab: VocabService, private serviceDef: DefinicaoService) { }

  ngOnInit(): void {
    
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.newWord = {
      VOC_ID: undefined,
      VOC_PRJID: this.id,
      VOC_ROMANIZACAO: '',
      VOC_TRANSCRICAO: '',
      contagem: 0
  };
    this.serviceConlangs.detailConlang(this.id).subscribe((resposta: projeto_detail) => {
      this.projeto = resposta;
    });

    this.getWords();
  }

  getWords(): void {
    // Call your API to get words associated with the project
    this.serviceVocab.getVocab(this.id).subscribe((data: vocabulo[]) => {
      this.words = data;

      //contando quantas definições cada palavra tem
      this.words.forEach(word => {
        if(word.VOC_ID !== undefined)
        { 
          this.countEntriesToWord(word.VOC_ID).subscribe(count => {
            word.contagem = count;
          });
        }
        else{
          word.contagem = 0;
        }
      });
    });
  }

  countEntriesToWord(idvoc : number): Observable<number>{
    return this.serviceDef.countEntries(idvoc);
  }
  addWord(): void {
    if (this.newWord.VOC_ROMANIZACAO && this.newWord.VOC_TRANSCRICAO) {
      this.newWord.VOC_PRJID = this.id;

      // Proceed to add the word
      const wordToAdd = { ...this.newWord};
      this.serviceVocab.addWord(wordToAdd).subscribe(() => {
        this.getWords(); // Refresh the list after adding
        this.newWord = {VOC_ID: undefined, VOC_PRJID: this.id, VOC_ROMANIZACAO: '', VOC_TRANSCRICAO: '', contagem: 0 }; // Reset the form
      });

    } else {
      alert('Preencha todos os campos!');
    }
  }

  editWord(word: vocabulo): void {
    this.newWord = word;
    this.editingMode = true;
  }

  confirmEditWord(): void{
    this.serviceVocab.editWord(this.newWord).subscribe((updatedWord) => {
    this.getWords(); // Refresh the list after editing
    this.newWord = {VOC_ID: undefined, VOC_PRJID: this.id, VOC_ROMANIZACAO: '', VOC_TRANSCRICAO: '', contagem: 0 }; // Reset the form
    this.editingMode = false;
    });
  }

  confirmRemoveWord(word: vocabulo): void {
    const confirmRemove = confirm(`Tem certeza em remover "${word.VOC_ROMANIZACAO}"?`);
    if (confirmRemove) {
      if(word.VOC_ID != null)
      {
        this.serviceVocab.removeWord(word.VOC_ID).subscribe(() => {
          this.getWords(); // Refresh the list after removing
        });
      }
    }
  }
}
