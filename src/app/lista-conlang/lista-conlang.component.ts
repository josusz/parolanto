import { Component, OnInit } from '@angular/core';
import { ConlangsService } from '../conlangs.service';
import { conlang } from '../lista-geral';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsuarioService } from '../usuario.service';
import { NavbarInterativoComponent } from '../navbar-interativo/navbar-interativo.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lista-conlang',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarInterativoComponent, RouterModule],
  templateUrl: './lista-conlang.component.html',
  styleUrl: './lista-conlang.component.css'
})
export class ListaConlangComponent implements OnInit {
  newProjeto! : conlang;
  items: conlang[] = [];
  //usuario: string|null = '';
  constructor(private serviceConlangs: ConlangsService, private serviceUsers: UsuarioService) { }

  ngOnInit(): void {
      this.resetObj();
      this.serviceConlangs.getConlangsFromUser().subscribe((resposta: conlang[]) => {
        this.items = resposta;
      });
  }

  addProject(): void {
    // Check required fields
    if (!this.newProjeto.PRJ_NOME) {
      alert('Por favor, preencha os campos obrigatórios.');
      return;
    }

    // Send data to the backend
    const projectToAdd = { ...this.newProjeto};
      this.serviceConlangs.addProject(projectToAdd).subscribe(() => {
        this.updateList(); // Refresh the list after adding
        this.resetObj();
      });
  }

  resetObj(): void {
    this.newProjeto = {
      PRJ_DESCRICAO: "",
      PRJ_NOME: "",
      PRJ_FONOTATICA: "",
      PRJ_ID: undefined
  };
  }

  updateList(): void {
    this.serviceConlangs.getConlangsFromUser().subscribe((resposta: conlang[]) => {
      this.items = resposta;
    });
  }

}
