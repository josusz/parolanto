import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { UsuarioService } from '../usuario.service';
@Component({
  selector: 'app-registrar-usuario',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registrar-usuario.component.html',
  styleUrl: './registrar-usuario.component.css'
})
export class RegistrarUsuarioComponent  {
  formGroupRegisterUser: FormGroup;

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
      },
      error: (error) => {
        console.error('Erro ao registrar usuário:', error);
      }
    });
  }
}