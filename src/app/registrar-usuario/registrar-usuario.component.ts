import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { UsuarioService } from '../usuario.service';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../modal/modal.component';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-registrar-usuario',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ModalComponent, RouterModule],
  templateUrl: './registrar-usuario.component.html',
  styleUrl: './registrar-usuario.component.css'
})
export class RegistrarUsuarioComponent {
  formGroupRegisterUser: FormGroup;
  errorMessages: string[] = [];
  successMessages: string[] = [];

  @ViewChild(ModalComponent) modalComponent?: ModalComponent;

  constructor(private usuarioService: UsuarioService, private formBuilder: FormBuilder) {
    this.formGroupRegisterUser = this.formBuilder.group({
      nomeUsuario: [''],
      emailUsuario: [''],
      senhaUsuario: [''],
      senhaUsuarioConfirmacao: [''],
      concordaTermos: [false]
    });
  }

  registrarUsuario() {
    this.usuarioService.registrarUsuario(this.formGroupRegisterUser.value).subscribe({
      next: (response) => {
        console.log('Usuário registrado com sucesso!', response);
        this.successMessages = ['Efetue a autenticação para explorar a Parolanto.'];
        this.openModal('success', 'Registrado com sucesso!');
      },
      error: (error) => {
        console.error('Erro ao registrar usuário:', error);
        //atualiza mensagens de erro com base na resposta da API
        if (error.status === 403 && error.error.errors) {
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