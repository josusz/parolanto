import { Component, OnInit, ViewChild } from '@angular/core';
import { NavbarInterativoComponent } from "../navbar-interativo/navbar-interativo.component";
import { UsuarioService } from '../usuario.service';
import { CommonModule } from '@angular/common';
import { ModalAlteracaoSenhaComponent } from '../modal-alteracao-senha/modal-alteracao-senha.component';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-perfil-usuario-autenticado',
  standalone: true,
  imports: [NavbarInterativoComponent, CommonModule, ModalAlteracaoSenhaComponent, RouterModule],
  templateUrl: './perfil-usuario-autenticado.component.html',
  styleUrl: './perfil-usuario-autenticado.component.css'
})
export class PerfilUsuarioAutenticadoComponent implements OnInit {
  usuario: any;
  projetos: any[] = [];
  avatares = [ 
    'images/user-avatar-default.svg',
    'images/user-avatar1.svg',
    'images/user-avatar2.svg',
    'images/user-avatar3.svg'
  ]

  errorMessages: string[] = [];
  successMessages: string[] = [];

  iconeMenu: boolean = false;

  @ViewChild(ModalAlteracaoSenhaComponent) modalAlteracaoSenhaComponent?: ModalAlteracaoSenhaComponent;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    const successMessage = sessionStorage.getItem('avatarSuccessMessage');
    if (successMessage) {
      this.successMessages = [successMessage];
      sessionStorage.removeItem('avatarSuccessMessage');
    }

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

  atualizarAvatar(novoAvatar: string) {
    this.usuarioService.atualizarAvatar(novoAvatar).subscribe({
      next: (response) => {
        this.usuario.avatar = novoAvatar;
        window.location.reload();
        if (response.message) {
          sessionStorage.setItem('avatarSuccessMessage', response.message);
        }
        this.errorMessages = []; //limpa mensagens de erro anteriores
      },
      error: (error) => {
        console.error('Erro ao alterar a senha do usuário:', error);
        //atualiza mensagens de erro com base na resposta da API
        if (error.error && error.error.errors) {
          this.errorMessages = error.error.errors.map((err: any) => err.msg);
        } else {
          this.errorMessages = ['Ocorreu um erro inesperado.'];
        }
        this.successMessages = []; //limpa qualquer mensagem de sucesso anterior
      }
    });
  }

  inverteDirecao() {
    this.iconeMenu = !this.iconeMenu;
  }
}