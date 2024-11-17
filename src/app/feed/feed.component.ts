import { Component } from '@angular/core';
import { listaConlangs } from '../lista-conlangs';
import { ConlangsService } from '../conlangs.service';
import { CommonModule } from '@angular/common';
import { NavbarInterativoComponent } from "../navbar-interativo/navbar-interativo.component";
import { RouterModule } from '@angular/router';

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

  constructor(private conlangsService: ConlangsService) { }

  ngOnInit(): void {
    this.carregarProjetos();
  }

  carregarProjetos(): void {
    this.conlangsService.getProjetosFeed(this.ordemAtual).subscribe(response => {
      this.projetos = response.projetos;
    });
  }

  alterarOrdem(criterio: string): void {
    this.ordemAtual = criterio;
    this.carregarProjetos();
  }
}