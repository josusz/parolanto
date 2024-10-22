import { Component } from '@angular/core';
import { NavbarInterativoComponent } from "../navbar-interativo/navbar-interativo.component";

@Component({
  selector: 'app-perfil-usuario-autenticado',
  standalone: true,
  imports: [NavbarInterativoComponent],
  templateUrl: './perfil-usuario-autenticado.component.html',
  styleUrl: './perfil-usuario-autenticado.component.css'
})
export class PerfilUsuarioAutenticadoComponent {

}
