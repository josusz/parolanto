import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../usuario.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar-interativo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar-interativo.component.html',
  styleUrl: './navbar-interativo.component.css'
})
export class NavbarInterativoComponent {
  nomeUsuario: string | null = '';
  iconeNotificacao: string = 'bi bi-bell';

  constructor(private router: Router, private usuarioService: UsuarioService) { 
    this.nomeUsuario = this.usuarioService.getNomeUsuario();
  }

  alteraIcone(isHovered: boolean) {
    this.iconeNotificacao = isHovered ? 'bi bi-bell-fill' : 'bi bi-bell';
  }

  logout() {
    //remove o token do localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('nomeUsuario');

    //redireciona para a página inicial
    this.router.navigate(['/pagina-inicial-parolanto']);
  }
}
