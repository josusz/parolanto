import { Component } from '@angular/core';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-modal-alteracao-senha',
  standalone: true,
  imports: [],
  templateUrl: './modal-alteracao-senha.component.html',
  styleUrl: './modal-alteracao-senha.component.css'
})
export class ModalAlteracaoSenhaComponent {

  private modalElement: HTMLElement | null = null; //inicialização com null
  private bsModal?: Modal; //uso de undefined como padrão

  constructor() { }

  ngAfterViewInit() {
    this.modalElement = document.getElementById('alterarSenhaModal') as HTMLElement;
    if (this.modalElement) {
      this.bsModal = new Modal(this.modalElement);
    }
  }

  openModal() {
    if (this.bsModal) {
      this.bsModal.show();
    }
  }
}
