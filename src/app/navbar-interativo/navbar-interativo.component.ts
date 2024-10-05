import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-interativo',
  standalone: true,
  imports: [],
  templateUrl: './navbar-interativo.component.html',
  styleUrl: './navbar-interativo.component.css'
})
export class NavbarInterativoComponent {
  constructor(private router: Router) { }

  logout() {
    //remove o token do localStorage
    localStorage.removeItem('token');

    //redireciona para a página inicial
    this.router.navigate(['/pagina-inicial-parolanto']);
  }
}
