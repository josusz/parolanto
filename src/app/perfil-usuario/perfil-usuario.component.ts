import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UsuarioService } from '../usuario.service';
import { NavbarInterativoComponent } from "../navbar-interativo/navbar-interativo.component";
import { CommonModule } from '@angular/common';
import { ModalComponent } from "../modal/modal.component";
import { Location } from '@angular/common';

@Component({
  selector: 'app-perfil-usuario',
  standalone: true,
  imports: [NavbarInterativoComponent, CommonModule, RouterModule, ModalComponent],
  templateUrl: './perfil-usuario.component.html',
  styleUrl: './perfil-usuario.component.css'
})
export class PerfilUsuarioComponent implements OnInit {
  usuario: any;
  projetos: any[] = [];
  id!: number;
  errorMessages: string[] = [];
  usuarioEncontrado: boolean = true;

  @ViewChild(ModalComponent) modalComponent?: ModalComponent;

  constructor(private route: ActivatedRoute, private usuarioService: UsuarioService, private location: Location) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.getUsuarioData();
  }

  getUsuarioData(): void {
    this.usuarioService.getUsuarioById(this.id).subscribe({
      next: (data) => {
        this.usuario = data;
        this.projetos = data.projetos;
        this.usuarioEncontrado = true;
      },
      error: (err) => {
        this.errorMessages = [err.error.message || 'Erro ao carregar dados do usuário.'];
        this.usuarioEncontrado = false;
        this.openModal('error', 'Atenção!');
      }
    });
  }

  openModal(modalType: 'error', title: string) {
    if (this.modalComponent) {
      this.modalComponent.modalType = modalType;
      this.modalComponent.title = title;
      this.modalComponent.messages =this.errorMessages;
      this.modalComponent.openModal();
    }
  }
}