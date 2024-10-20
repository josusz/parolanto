import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UsuarioService } from '../usuario.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar-interativo',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar-interativo.component.html',
  styleUrl: './navbar-interativo.component.css'
})
export class NavbarInterativoComponent {
  nomeUsuario: string | null = '';
  iconeMenu: boolean = false;

  constructor(private router: Router, private usuarioService: UsuarioService) { 
    this.nomeUsuario = this.usuarioService.getNomeUsuario();
  }
  
  inverteDirecao() {
    this.iconeMenu = !this.iconeMenu;
  }

  logout() {
    //remove o token do localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('nomeUsuario');

    //redireciona para a página inicial
    this.router.navigate(['/pagina-inicial-parolanto']);
  }
}
