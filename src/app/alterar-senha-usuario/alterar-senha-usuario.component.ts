import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from '../modal/modal.component';
import { UsuarioService } from '../usuario.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-alterar-senha-usuario',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './alterar-senha-usuario.component.html',
  styleUrl: './alterar-senha-usuario.component.css'
})
export class AlterarSenhaUsuarioComponent {
  formGroupChangePasswordUser: FormGroup;
  errorMessages: string[] = [];
  successMessages: string[] = [];

  @ViewChild(ModalComponent) modalComponent?: ModalComponent;

  constructor(private usuarioService: UsuarioService, private formBuilder: FormBuilder, private location: Location) {
    this.formGroupChangePasswordUser = this.formBuilder.group({
      emailUsuario: ['']
    });
  }

  voltarPaginaAnterior() {
    this.location.back();
  }
}
