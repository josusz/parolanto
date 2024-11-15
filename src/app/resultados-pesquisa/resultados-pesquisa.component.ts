import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UsuarioService } from '../usuario.service';
import { ConlangsService } from '../conlangs.service';
import { CommonModule } from '@angular/common';
import { listaUsuarios } from '../lista-usuarios';
import { listaConlangs } from '../lista-conlangs';
import { NavbarInterativoComponent } from "../navbar-interativo/navbar-interativo.component";

@Component({
  selector: 'app-resultados-pesquisa',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarInterativoComponent],
  templateUrl: './resultados-pesquisa.component.html',
  styleUrl: './resultados-pesquisa.component.css'
})
export class ResultadosPesquisaComponent implements OnInit {
  termoPesquisa: string = '';
  usuarios: listaUsuarios[] = [];
  projetos: listaConlangs[] = [];
  contagemUsuarios: number = 0;
  contagemProjetos: number = 0;

  constructor(private route: ActivatedRoute, private usuarioService: UsuarioService, private conlangsService: ConlangsService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.termoPesquisa = params['termo'];
      this.buscarResultados();
    });
  }

  buscarResultados(): void {
    this.usuarios = [];
    this.projetos = [];
    this.contagemUsuarios = 0;
    this.contagemProjetos = 0;

    //buscar usuários
    this.usuarioService.getUsuariosTermoPesquisado(this.termoPesquisa).subscribe(response => {
      this.usuarios = response.usuarios;
      this.contagemUsuarios = this.usuarios.length;

      this.usuarios.forEach(usuario => {
        this.usuarioService.getQuantidadeProjetosUsuario(usuario.idUsuario).subscribe(totalProjetos => {
          usuario.totalProjetos = totalProjetos; //adiciona a contagem na interface
        });
      });
    });

    //buscar projetos
    this.conlangsService.getConlangsTermoPesquisado(this.termoPesquisa).subscribe(response => {
      this.projetos = response.projetos;
      this.contagemProjetos = this.projetos.length;
    });
  }
}
