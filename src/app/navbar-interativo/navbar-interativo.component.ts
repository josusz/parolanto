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
  avatarUsuario: string | null = '';
  iconeMenu: boolean = false;

  constructor(private router: Router, private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.nomeUsuario = this.usuarioService.getNomeUsuario();
    this.avatarUsuario = this.usuarioService.getAvatarUsuario();

    this.usuarioService.getUsuarioAutenticado().subscribe({
      next: (response) => {
        this.nomeUsuario = response.nome;
        this.avatarUsuario = response.avatar || this.avatarUsuario;
      },
      error: (error) => {
        console.error('Erro ao carregar o usuário autenticado', error);
      }
    });
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
