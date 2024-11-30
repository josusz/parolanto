import { Component } from '@angular/core';
import { listaConlangs } from '../lista-conlangs';
import { ConlangsService } from '../conlangs.service';
import { CommonModule } from '@angular/common';
import { NavbarInterativoComponent } from "../navbar-interativo/navbar-interativo.component";
import { RouterModule } from '@angular/router';
import { ComentariosService } from '../comentarios.service';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule, NavbarInterativoComponent, RouterModule],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css'
})
export class FeedComponent {
  projetos: listaConlangs[] = [];
  ordemAtual: string = 'aleatorio';

  constructor(private conlangsService: ConlangsService, private comentariosService: ComentariosService) { }

  ngOnInit(): void {
    this.carregarProjetos();
  }

  carregarProjetos(): void {
    this.conlangsService.getProjetosFeed(this.ordemAtual).subscribe(response => {
      //para cada projeto, carrega o total de comentários
      this.projetos = response.projetos.map(projeto => ({
        ...projeto, //copia todos os campos originais do projeto
        totalComentarios: 0,
      }));

      this.projetos.forEach(projeto => {
        this.carregarTotalComentarios(projeto);
      });
    });
  }

  alterarOrdem(criterio: string): void {
    this.ordemAtual = criterio;
    this.carregarProjetos();
  }

  carregarTotalComentarios(projeto: listaConlangs): void {
    this.comentariosService.contarComentarios(projeto.idProjeto).subscribe({
      next: (total) => {
        projeto.totalComentarios = total; //atualiza o total de comentários para o projeto
      },
      error: (err) => {
        console.error(`Erro ao contar comentários do projeto ${projeto.idProjeto}:`, err);
      }
    });
  }
}