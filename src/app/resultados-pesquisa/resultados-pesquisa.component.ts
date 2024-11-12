import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UsuarioService } from '../usuario.service';
import { ConlangsService } from '../conlangs.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resultados-pesquisa',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './resultados-pesquisa.component.html',
  styleUrl: './resultados-pesquisa.component.css'
})
export class ResultadosPesquisaComponent implements OnInit {
  termoPesquisa: string = '';
  usuarios: any[] = [];
  conlangs: any[] = [];

  constructor(private route: ActivatedRoute, private usuarioService: UsuarioService, private conlangsService: ConlangsService) { }

  ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
        this.termoPesquisa = params['termo'];
        this.buscarResultados();
      });
  }

  buscarResultados(): void {
    //buscar usuários
    this.usuarioService.getUsuariosTermoPesquisado(this.termoPesquisa).subscribe(usuarios => {
      this.usuarios = usuarios;
    });

    //buscar projetos
    this.conlangsService.getConlangsTermoPesquisado(this.termoPesquisa).subscribe(conlangs => {
      this.conlangs = conlangs;
    });
  }
}
