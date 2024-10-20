import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service'; // ajuste o caminho conforme necessário
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: any): boolean {
    const isAuthenticated = this.authService.isAuthenticated();

    //verifica se a rota é de login ou registro, e redireciona para o feed se já estiver autenticado
    if ((route.routeConfig.path === 'logar-usuario' || route.routeConfig.path === 'registrar-usuario') && isAuthenticated) {
      this.router.navigate(['/feed']);
      return false;
    }

    //bloqueia acesso a rotas privadas se o usuário não estiver autenticado
    if (!isAuthenticated && route.routeConfig.path !== 'logar-usuario' && route.routeConfig.path !== 'registrar-usuario') {
      this.router.navigate(['/pagina-inicial-parolanto']);
      return false;
    }

    return true;
  }
}

export const authGuard: CanActivateFn = (route, state) => {
  const guard = new AuthGuard(new AuthService(), new Router());
  return guard.canActivate(route);
};