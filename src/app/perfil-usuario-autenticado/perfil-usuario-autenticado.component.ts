import { Component, OnInit, ViewChild } from '@angular/core';
import { NavbarInterativoComponent } from "../navbar-interativo/navbar-interativo.component";
import { UsuarioService } from '../usuario.service';
import { CommonModule } from '@angular/common';
import { ModalAlteracaoSenhaComponent } from '../modal-alteracao-senha/modal-alteracao-senha.component';
@Component({
  selector: 'app-perfil-usuario-autenticado',
  standalone: true,
  imports: [NavbarInterativoComponent, CommonModule, ModalAlteracaoSenhaComponent],
  templateUrl: './perfil-usuario-autenticado.component.html',
  styleUrl: './perfil-usuario-autenticado.component.css'
})
export class PerfilUsuarioAutenticadoComponent implements OnInit {
  usuario: any;
  projetos: any[] = [];

  @ViewChild(ModalAlteracaoSenhaComponent) modalAlteracaoSenhaComponent?: ModalAlteracaoSenhaComponent;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.usuarioService.getUsuarioAutenticado().subscribe({
      next: (data) => {
        this.usuario = data,
          this.projetos = data.projetos;
      },
      error: (err) => console.error('Erro ao carregar dados do usuário:', err)
    });
  }

  openModal() {
    this.modalAlteracaoSenhaComponent?.openModal() || console.error('Modal component não encontrado.');
  }
}