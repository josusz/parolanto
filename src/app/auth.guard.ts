import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service'; // ajuste o caminho conforme necessário
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/pagina-inicial-parolanto']);
      return false;
    }
    return true;
  }
}

export const authGuard: CanActivateFn = (route, state) => {
  const guard = new AuthGuard(new AuthService(), new Router());
  return guard.canActivate();
};