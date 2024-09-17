import { Routes } from '@angular/router';
import { RegistrarUsuarioComponent } from './registrar-usuario/registrar-usuario.component';
import { LogarUsuarioComponent } from './logar-usuario/logar-usuario.component';
import { AlterarSenhaUsuarioComponent } from './alterar-senha-usuario/alterar-senha-usuario.component';

export const routes: Routes = [
    { path: 'registrar-usuario', component: RegistrarUsuarioComponent },
    { path: 'logar-usuario', component: LogarUsuarioComponent },
    { path: 'alterar-senha', component: AlterarSenhaUsuarioComponent },
    { path: '', redirectTo: 'registrar-usuario', pathMatch: 'full' }
];