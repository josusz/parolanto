import { Component, Input } from '@angular/core';
import { vocabulo } from '../vocab';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { VocabService } from '../vocab.service';
import { DefinicaoService } from '../definicao.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gerenciar-vocabulos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './gerenciar-vocabulos.component.html',
  styleUrl: './gerenciar-vocabulos.component.css'
})
export class GerenciarVocabulosComponent {
  @Input() id!: number;
  words: vocabulo[] = [];
  newWord!: vocabulo;
  editingMode: boolean = false;

  constructor(private route: ActivatedRoute, private serviceVocab: VocabService, private serviceDef: DefinicaoService) { }

  ngOnInit(): void {
    
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.resetObj();

    this.getWords();
  }
  resetObj()
  {
    this.newWord = {
      VOC_ID: undefined,
      VOC_PRJID: this.id,
      VOC_ROMANIZACAO: '',
      VOC_TRANSCRICAO: '',
      contagem: 0
  };
  }
  exitEditMode()
  {
    this.editingMode = false;
    this.resetObj();
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
        this.resetObj(); // Reset the form
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
    this.exitEditMode();
    });
  }

  confirmRemoveWord(word: vocabulo): void {
    const confirmRemove = confirm(`Tem certeza em remover "${word.VOC_ROMANIZACAO}"?`);
    if (confirmRemove) {
      if(word.VOC_ID != null)
      {
        this.serviceVocab.removeWord(word.VOC_ID).subscribe(() => {
          this.getWords(); // Refresh the list after removing
          if(word.VOC_ID === this.newWord.VOC_ID)
            this.exitEditMode();
        });
      }
    }
  }
}
