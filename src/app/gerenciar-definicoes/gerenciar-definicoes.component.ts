import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VocabService } from '../vocab.service';
import { vocab_detail } from '../vocab_detail';
import { definicao } from '../definicao';
import { DefinicaoService } from '../definicao.service';

@Component({
  selector: 'app-gerenciar-definicoes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gerenciar-definicoes.component.html',
  styleUrl: './gerenciar-definicoes.component.css'
})
export class GerenciarDefinicoesComponent implements OnInit {
  word!: vocab_detail 
  id!: number;
  index: number | null = null;
  defs: definicao[] = [];
  newDef!: definicao;
  editingMode: boolean = false;

  constructor(private route: ActivatedRoute, private serviceVocab: VocabService, private serviceDef: DefinicaoService) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.resetObj();
    this.serviceVocab.detailWord(this.id).subscribe((resposta: vocab_detail) => {
      this.word = resposta;
    });

    this.getDefs();
  }

  getDefs(): void {
    this.serviceDef.getDefs(this.id).subscribe((data: definicao[]) => {
      this.defs = data;
    });
  }
  addDef(): void {
    if (this.newDef.DEF_CLASSE && this.newDef.DEF_DESCRICAO) {
      this.newDef.DEF_VOCID = this.id;

      // Proceed to add the entry
      const defToAdd = { ...this.newDef};
      this.serviceDef.addDef(defToAdd).subscribe(() => {
        this.getDefs(); // Refresh the list after adding
        this.resetObj(); // Reset the form
      });

    } else {
      alert('Preencha todos os campos!');
    }
  }

  editDef(def: definicao, index: number): void {
    this.index = index + 1;
    this.newDef = def;
    this.editingMode = true;
  }

  confirmEditDef(): void{
    this.serviceDef.editDef(this.newDef).subscribe((updatedDef) => {
    this.getDefs(); // Refresh the list after editing
    this.exitEditMode();
    });
  }

  exitEditMode(): void{
    this.editingMode = false;
    this.resetObj();
  }

  resetObj()
  {
    this.newDef = {
      DEF_ID : undefined,
      DEF_CLASSE : "",
      DEF_DESCRICAO : "",
      DEF_VOCID : this.id
    };
  }

  confirmRemoveDef(def: definicao): void {
    const confirmRemove = confirm(`Tem certeza em remover esta definição?`);
    if (confirmRemove) {
      if(def.DEF_ID != null)
      {
        this.serviceDef.removeDef(def.DEF_ID).subscribe(() => {
          this.getDefs(); // Refresh the list after removing
          if(def.DEF_ID === this.newDef.DEF_ID)
            this.exitEditMode();
        });
      }
    }
  }
}
