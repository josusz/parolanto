import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from '../modal/modal.component';
import { UsuarioService } from '../usuario.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-alterar-senha-usuario',
  standalone: true,
  imports: [ReactiveFormsModule, ModalComponent],
  templateUrl: './alterar-senha-usuario.component.html',
  styleUrl: './alterar-senha-usuario.component.css'
})
export class AlterarSenhaUsuarioComponent {
  formGroupChangePasswordUser: FormGroup;
  errorMessages: string[] = [];
  successMessages: string[] = [];

  @ViewChild(ModalComponent) modalComponent?: ModalComponent;

  constructor(private usuarioService: UsuarioService, private formBuilder: FormBuilder, private location: Location, private router: Router) {
    this.formGroupChangePasswordUser = this.formBuilder.group({
      emailUsuario: ['']
    });
  }

  alterarSenhaLink() {
    this.usuarioService.alterarSenhaLink(this.formGroupChangePasswordUser.value).subscribe({
      next: (response) => {
        console.log('Link de alteração de senha enviado ao e-mail cadastrado!', response);
        this.router.navigate(['/alterar-senha-confirmacao']);
      },
      error: (error) => {
        console.error('Erro ao encontrar o e-mail do usuário:', error);
        //atualiza mensagens de erro com base na resposta da API
        if (error.error && error.error.errors) {
          this.errorMessages = error.error.errors.map((err: any) => err.msg);
        } else {
          this.errorMessages = ['E-mail não cadastrado.'];
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

  voltarPaginaAnterior() {
    this.location.back();
  }
}