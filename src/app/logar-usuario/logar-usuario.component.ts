import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-logar-usuario',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './logar-usuario.component.html',
  styleUrl: './logar-usuario.component.css'
})
export class LogarUsuarioComponent {

}
