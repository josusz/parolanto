import { Component, Input } from '@angular/core';
import { regra } from '../regras';
import { ActivatedRoute } from '@angular/router';
import { ExemploService } from '../exemplo.service';
import { exemplo } from '../exemplos';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../usuario.service';
import { ConlangsService } from '../conlangs.service';
import { projeto_detail } from '../projeto_detail';

@Component({
  selector: 'app-gerenciar-exemplos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gerenciar-exemplos.component.html',
  styleUrl: './gerenciar-exemplos.component.css'
})
export class GerenciarExemplosComponent {
  @Input() id!: number;
  exemplos: exemplo[] = [];
  newExemplo!: exemplo;
  editingMode: boolean = false;
  projeto!: projeto_detail;
  master: boolean = false;

  constructor(private route: ActivatedRoute, private serviceExemplo: ExemploService, private serviceUser: UsuarioService, private serviceConlangs: ConlangsService) { }
  ngOnInit(): void {
    
    this.carregarProjeto();
    this.resetObj();

    this.getExemplos();
  }
  carregarProjeto(): void{
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.serviceConlangs.detailConlang(this.id).subscribe((resposta: projeto_detail) => {
      this.projeto = resposta;
      this.checarUser();
    });
  }
  checarUser(): void{
    this.serviceUser.getUsuarioAutenticadoId().subscribe((id: number) => {
      if(this.projeto.USR_ID == id)
      {
        this.master = true;
        console.log("veio: " + this.master);
      }
    });
  }
  resetObj()
  {
    this.newExemplo = {
      EXE_ID: undefined,
      EXE_PRJID: this.id,
      EXE_TITULO: '',
      EXE_CORPO: ''
  };
  }
  exitEditMode()
  {
    this.editingMode = false;
    this.resetObj();
  }
  getExemplos(): void {
    // Call your API to get words associated with the project
    this.serviceExemplo.getEx(this.id).subscribe((data: exemplo[]) => {
      this.exemplos = data;
    });
  }

  addExemplo(): void {
    if (this.newExemplo.EXE_TITULO && this.newExemplo.EXE_CORPO) {
      this.newExemplo.EXE_PRJID = this.id;

      // Proceed to add the word
      const regraToAdd = { ...this.newExemplo};
      this.serviceExemplo.addEx(regraToAdd).subscribe(() => {
        this.getExemplos(); // Refresh the list after adding
        this.resetObj(); // Reset the form*/
      });

    } else {
      alert('Preencha todos os campos!');
    }
  }

  confirmRemoveExemplo(ex: exemplo): void {
    const confirmRemove = confirm(`Tem certeza em remover "${ex.EXE_TITULO}"?`);
    if (confirmRemove) {
      if(ex.EXE_ID != null)
      {
        this.serviceExemplo.removeEx(ex.EXE_ID).subscribe(() => {
          this.getExemplos(); // Refresh the list after removing
        });
      }
    }
  }
}
