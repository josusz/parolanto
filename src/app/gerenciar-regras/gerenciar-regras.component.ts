import { Component, Input } from '@angular/core';
import { regra } from '../regras';
import { ActivatedRoute } from '@angular/router';
import { RegraService } from '../regra.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConlangsService } from '../conlangs.service';
import { projeto_detail } from '../projeto_detail';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-gerenciar-regras',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gerenciar-regras.component.html',
  styleUrl: './gerenciar-regras.component.css'
})
export class GerenciarRegrasComponent {
  @Input() id!: number;
  regras: regra[] = [];
  newRegra!: regra;
  editingMode: boolean = false;
  projeto!: projeto_detail;
  master: boolean = false;

  constructor(private route: ActivatedRoute, private serviceRegra: RegraService, private serviceConlangs: ConlangsService, private serviceUser: UsuarioService) { }

  ngOnInit(): void {
    
    this.carregarProjeto();
    this.resetObj();
    this.getRegras();
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
    this.newRegra = {
      REG_ID: undefined,
      REG_PRJID: this.id,
      REG_TITULO: '',
      REG_CORPO: ''
  };
  }
  exitEditMode()
  {
    this.editingMode = false;
    this.resetObj();
  }
  getRegras(): void {
    // Call your API to get words associated with the project
    this.serviceRegra.getRegras(this.id).subscribe((data: regra[]) => {
      this.regras = data;
    });
  }

  addRegra(): void {
    if (this.newRegra.REG_TITULO && this.newRegra.REG_CORPO) {
      this.newRegra.REG_PRJID = this.id;

      // Proceed to add the word
      const regraToAdd = { ...this.newRegra};
      this.serviceRegra.addRegra(regraToAdd).subscribe(() => {
        this.getRegras(); // Refresh the list after adding
        this.resetObj(); // Reset the form*/
      });

    } else {
      alert('Preencha todos os campos!');
    }
  }

  editRegra(regra: regra): void {
    this.newRegra = regra;
    this.editingMode = true;
  }

  confirmEditRegra(): void{
    this.serviceRegra.editRegra(this.newRegra).subscribe((updatedRegra) => {
    this.getRegras(); // Refresh the list after editing
    this.exitEditMode();
    });
  }

  confirmRemoveRegra(regra: regra): void {
    const confirmRemove = confirm(`Tem certeza em remover "${regra.REG_TITULO}"?`);
    if (confirmRemove) {
      if(regra.REG_ID != null)
      {
        this.serviceRegra.removeRegra(regra.REG_ID).subscribe(() => {
          this.getRegras(); // Refresh the list after removing
          if(regra.REG_ID === this.newRegra.REG_ID)
            this.exitEditMode();
        });
      }
    }
  }
}
