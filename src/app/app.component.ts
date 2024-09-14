import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegistrarUsuarioComponent } from "./registrar-usuario/registrar-usuario.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RegistrarUsuarioComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'parolanto';
}
