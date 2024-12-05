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
import { ComentariosComponent } from "../comentarios-projeto/comentarios-projeto.component";
import { NavbarInterativoComponent } from "../navbar-interativo/navbar-interativo.component";
import { GerenciarVocabulosComponent } from '../gerenciar-vocabulos/gerenciar-vocabulos.component';
import { GerenciarRegrasComponent } from '../gerenciar-regras/gerenciar-regras.component';
import { GerenciarExemplosComponent } from '../gerenciar-exemplos/gerenciar-exemplos.component';


@Component({
  selector: 'app-acessar-projeto',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ComentariosComponent, NavbarInterativoComponent, GerenciarVocabulosComponent, GerenciarRegrasComponent, GerenciarExemplosComponent],
  templateUrl: './acessar-projeto.component.html',
  styleUrl: './acessar-projeto.component.css'
})
export class AcessarProjetoComponent implements OnInit {
  projeto!: projeto_detail;
  id!: number;
  constructor(private route: ActivatedRoute, private serviceConlangs: ConlangsService, private serviceVocab: VocabService, private serviceDef: DefinicaoService) { }

  ngOnInit(): void {
    
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.serviceConlangs.detailConlang(this.id).subscribe((resposta: projeto_detail) => {
      this.projeto = resposta;
    });
  }
}
