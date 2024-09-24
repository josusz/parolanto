import { Routes } from '@angular/router';
import { RegistrarUsuarioComponent } from './registrar-usuario/registrar-usuario.component';
import { LogarUsuarioComponent } from './logar-usuario/logar-usuario.component';
import { AlterarSenhaUsuarioComponent } from './alterar-senha-usuario/alterar-senha-usuario.component';
import { AlterarSenhaUsuarioConfirmacaoComponent } from './alterar-senha-usuario-confirmacao/alterar-senha-usuario-confirmacao.component';
import { PaginaInicialParolantoComponent } from './pagina-inicial-parolanto/pagina-inicial-parolanto.component';

export const routes: Routes = [
    { path: 'pagina-inicial-parolanto', component: PaginaInicialParolantoComponent },
    { path: 'registrar-usuario', component: RegistrarUsuarioComponent },
    { path: 'logar-usuario', component: LogarUsuarioComponent },
    { path: 'alterar-senha', component: AlterarSenhaUsuarioComponent },
    { path: 'alterar-senha-confirmacao', component: AlterarSenhaUsuarioConfirmacaoComponent },
    { path: '', redirectTo: 'pagina-inicial-parolanto', pathMatch: 'full' },
    { path: 'parolanto', redirectTo: 'pagina-inicial-parolanto', pathMatch: 'full' }
];