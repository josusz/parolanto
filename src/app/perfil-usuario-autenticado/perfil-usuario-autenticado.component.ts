import { Component, OnInit } from '@angular/core';
import { NavbarInterativoComponent } from "../navbar-interativo/navbar-interativo.component";
import { UsuarioService } from '../usuario.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil-usuario-autenticado',
  standalone: true,
  imports: [NavbarInterativoComponent, CommonModule],
  templateUrl: './perfil-usuario-autenticado.component.html',
  styleUrl: './perfil-usuario-autenticado.component.css'
})
export class PerfilUsuarioAutenticadoComponent implements OnInit {
  usuario: any;
  projetos: any[] = [];

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.usuarioService.getUsuarioAutenticado().subscribe({
      next: (data) => {
        this.usuario = data,
        this.projetos = data.projetos;
      },
      error: (err) => console.error('Erro ao carregar dados do usuário:', err)
    });
  }
}