import { Component, OnInit } from '@angular/core';
import { ConlangsService } from '../conlangs.service';
import { conlang } from '../lista-geral';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsuarioService } from '../usuario.service';
import { NavbarInterativoComponent } from '../navbar-interativo/navbar-interativo.component';

@Component({
  selector: 'app-lista-conlang',
  standalone: true,
  imports: [CommonModule, NavbarInterativoComponent, RouterModule],
  templateUrl: './lista-conlang.component.html',
  styleUrl: './lista-conlang.component.css'
})
export class ListaConlangComponent implements OnInit {

  items: conlang[] = [];
  usuario: string|null = '';
  projetos: any[] = [];
  constructor(private serviceConlangs: ConlangsService, private serviceUsers: UsuarioService) { }

  ngOnInit(): void {

    this.usuario = this.serviceUsers.getNomeUsuario();
    if(this.usuario != null)
      this.serviceConlangs.getConlangsFromUser(this.usuario).subscribe((resposta: conlang[]) => {
        this.items = resposta;
      });

  }

}
