import { Routes } from '@angular/router';
import { RegistrarUsuarioComponent } from './registrar-usuario/registrar-usuario.component';
import { LogarUsuarioComponent } from './logar-usuario/logar-usuario.component';
import { AlterarSenhaUsuarioComponent } from './alterar-senha-usuario/alterar-senha-usuario.component';
import { AlterarSenhaUsuarioConfirmacaoComponent } from './alterar-senha-usuario-confirmacao/alterar-senha-usuario-confirmacao.component';
import { PaginaInicialParolantoComponent } from './pagina-inicial-parolanto/pagina-inicial-parolanto.component';
import { FeedComponent } from './feed/feed.component';
import { AuthGuard } from './auth.guard';
import { ListaConlangComponent } from './lista-conlang/lista-conlang.component';
import { AcessarProjetoComponent } from './acessar-projeto/acessar-projeto.component';
import { PerfilUsuarioAutenticadoComponent } from './perfil-usuario-autenticado/perfil-usuario-autenticado.component';

export const routes: Routes = [
    { path: 'pagina-inicial-parolanto', component: PaginaInicialParolantoComponent },
    { path: 'registrar-usuario', component: RegistrarUsuarioComponent, canActivate: [AuthGuard] },
    { path: 'logar-usuario', component: LogarUsuarioComponent, canActivate: [AuthGuard] },
    { path: 'alterar-senha', component: AlterarSenhaUsuarioComponent },
    { path: 'alterar-senha-confirmacao', component: AlterarSenhaUsuarioConfirmacaoComponent },
    { path: 'feed', component: FeedComponent, canActivate: [AuthGuard] },
    { path: 'perfil-usuario-autenticado', component: PerfilUsuarioAutenticadoComponent, canActivate: [AuthGuard] },
    { path: '', redirectTo: 'pagina-inicial-parolanto', pathMatch: 'full' },
    { path: 'parolanto', redirectTo: 'pagina-inicial-parolanto', pathMatch: 'full' },
    { path: 'conlangs', component: ListaConlangComponent },
    { path: "conlang_detail/:id", component: AcessarProjetoComponent }
];