import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { UsuarioService } from '../usuario.service';
import { CommonModule } from '@angular/common';
import { ErrorModalComponent } from "../error-modal/error-modal.component";
@Component({
  selector: 'app-registrar-usuario',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ErrorModalComponent],
  templateUrl: './registrar-usuario.component.html',
  styleUrl: './registrar-usuario.component.css'
})
export class RegistrarUsuarioComponent {
  formGroupRegisterUser: FormGroup;
  errorMessages: string[] = [];

  @ViewChild(ErrorModalComponent) errorModalComponent?: ErrorModalComponent;

  constructor(private usuarioService: UsuarioService, private formBuilder: FormBuilder) {
    this.formGroupRegisterUser = this.formBuilder.group({
      nomeUsuario: [''],
      emailUsuario: [''],
      senhaUsuario: [''],
      senhaUsuarioConfirmacao: ['']
    });
  }

  registrarUsuario() {
    this.usuarioService.registrarUsuario(this.formGroupRegisterUser.value).subscribe({
      next: (response) => {
        console.log('Usuário registrado com sucesso!', response);
        this.errorMessages = [];
      },
      error: (error) => {
        console.error('Erro ao registrar usuário:', error);
        // atualiza mensagens de erro com base na resposta da API
        if (error.status === 403 && error.error.errors) {
          this.errorMessages = error.error.errors.map((err: any) => err.msg);
        } else {
          this.errorMessages = ['Ocorreu um erro inesperado.'];
        }
        this.openErrorModal();
      }
    });
  }

  openErrorModal() {
    if (this.errorModalComponent) {
      this.errorModalComponent.openModal();
    }
  }
}