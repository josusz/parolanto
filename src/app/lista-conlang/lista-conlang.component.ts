import { Component, OnInit } from '@angular/core';
import { ConlangsService } from '../conlangs.service';
import { conlang } from '../lista-geral';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsuarioService } from '../usuario.service';
import { NavbarInterativoComponent } from '../navbar-interativo/navbar-interativo.component';
import { conlang_full } from '../conlang';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lista-conlang',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarInterativoComponent, RouterModule],
  templateUrl: './lista-conlang.component.html',
  styleUrl: './lista-conlang.component.css'
})
export class ListaConlangComponent implements OnInit {

  items: conlang_full[] = [];
  usuario: string|null = '';
  id!: number;
  projetos: any[] = [];
  newProject!:  conlang_full;
  editingMode: boolean = false;

  constructor(private serviceConlangs: ConlangsService, private serviceUsers: UsuarioService) { }

  ngOnInit(): void {

    this.usuario = this.serviceUsers.getNomeUsuario();
    alert(this.usuario);
    if(this.usuario)
      this.serviceUsers.getIdUsuarioByName(this.usuario).subscribe((idUsuario: number) => {
        this.id = idUsuario;
      });
    alert(this.id);
    this.conlangList();
    

  }
  addProject(): void {
    if (this.newProject.PRJ_NOME && this.newProject.PRJ_DESCRICAO && this.id) {
      this.newProject.PRJ_USRID = Number(this.id);
      
      // Proceed to add the word
      const projectToAdd = { ...this.newProject};
      this.serviceConlangs.addConlang(projectToAdd).subscribe(() => {
        this.conlangList(); // Refresh the list after adding
        this.newProject = {PRJ_ID: undefined, PRJ_USRID: Number(this.id), PRJ_NOME: '', PRJ_DESCRICAO: '', PRJ_FONOTATICA: '' }; // Reset the form
      });

    } else {
      alert('Preencha todos os campos!');
    }
  }

  conlangList(): void {
    if(this.usuario != null)
      this.serviceConlangs.getConlangsFromUser(this.usuario).subscribe((resposta: conlang_full[]) => {
        this.items = resposta;
      });
  }
}
