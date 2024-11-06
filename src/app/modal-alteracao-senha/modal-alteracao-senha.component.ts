import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Modal } from 'bootstrap';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-modal-alteracao-senha',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './modal-alteracao-senha.component.html',
  styleUrl: './modal-alteracao-senha.component.css'
})
export class ModalAlteracaoSenhaComponent {
  private modalElement: HTMLElement | null = null; //inicialização com null
  private bsModal?: Modal; //uso de undefined como padrão

  formGroupUpdatePasswordUser: FormGroup;
  errorMessages: string[] = [];
  successMessages: string[] = [];

  constructor(private usuarioService: UsuarioService, private formBuilder: FormBuilder) {
    this.formGroupUpdatePasswordUser = this.formBuilder.group({
      senhaAtualUsuario: [''],
      senhaDesejadaUsuario: [''],
      senhaDesejadaConfirmacaoUsuario: ['']
    });
  }

  ngAfterViewInit() {
    this.modalElement = document.getElementById('alterarSenhaModal') as HTMLElement;
    if (this.modalElement) {
      this.bsModal = new Modal(this.modalElement);
    }
  }

  openModal() {
    if (this.bsModal) {
      this.bsModal.show();
    }
  }

  alterarSenhaUsuario() {
    this.usuarioService.alterarSenha(this.formGroupUpdatePasswordUser.value).subscribe({
      next: (response) => {
        console.log('Senha alterada com sucesso!', response);
        if (response.message) {
          this.successMessages = [response.message];
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
}
