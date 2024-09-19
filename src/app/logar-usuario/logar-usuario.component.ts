import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UsuarioService } from '../usuario.service';
import { ModalComponent } from "../modal/modal.component";

@Component({
  selector: 'app-logar-usuario',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule, ModalComponent],
  templateUrl: './logar-usuario.component.html',
  styleUrl: './logar-usuario.component.css'
})
export class LogarUsuarioComponent {
  formGroupLoginUser: FormGroup;
  errorMessages: string[] = [];
  successMessages: string[] = [];

  @ViewChild(ModalComponent) modalComponent?: ModalComponent;

  constructor(private usuarioService: UsuarioService, private formBuilder: FormBuilder) {
    this.formGroupLoginUser = this.formBuilder.group({
      emailUsuario: [''],
      senhaUsuario: [''],
      lembreMim: [false]
    });
  }

  logarUsuario() {
    this.usuarioService.logarUsuario(this.formGroupLoginUser.value).subscribe({
      next: (response) => {
        console.log('Usuário autenticado com sucesso!', response);
        this.successMessages = ['Bem-vindo(a) à Parolanto!'];
        this.openModal('success', 'Autenticado com sucesso!');
      },
      error: (error) => {
        console.error('Erro ao autenticar usuário:', error);
        //atualiza mensagens de erro com base na resposta da API
        if (error.error && error.error.errors) {
          this.errorMessages = error.error.errors.map((err: any) => err.msg);
        } else {
          this.errorMessages = ['Ocorreu um erro inesperado.'];
        }
        this.openModal('error', 'Atenção!');
      }
    });
  }

  openModal(modalType: 'success' | 'error', title: string) {
    if (this.modalComponent) {
      this.modalComponent.modalType = modalType;
      this.modalComponent.title = title;
      this.modalComponent.messages = modalType === 'success' ? this.successMessages : this.errorMessages;
      this.modalComponent.openModal();
    }
  }
}
