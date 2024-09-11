import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-logar-usuario',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './logar-usuario.component.html',
  styleUrl: './logar-usuario.component.css'
})
export class LogarUsuarioComponent {
  formGroupLoginUser: FormGroup;

  constructor(private usuarioService: UsuarioService, private formBuilder: FormBuilder) {
    this.formGroupLoginUser = this.formBuilder.group({
      emailUsuario: [''],
      senhaUsuario: [''],
      lembreMim: ['']
    });
  }
}
