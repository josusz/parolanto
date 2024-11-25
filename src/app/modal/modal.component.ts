import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @Input() title: string = 'Mensagem';
  @Input() messages: string[] = [];
  @Input() modalType: 'success' | 'error' = 'success';

  private modalElement: HTMLElement | null = null; //inicialização com null
  private bsModal?: Modal; //uso de undefined como padrão
  private onCloseCallback: (() => void) | null = null; //armazena o callback

  constructor() { }

  ngAfterViewInit() {
    this.modalElement = document.getElementById('genericModal') as HTMLElement;
    if (this.modalElement) {
      this.bsModal = new Modal(this.modalElement);
    }
  }

  openModal(callback?: () => void): void {
    this.onCloseCallback = callback || null; //salva o callback, se fornecido
    if (this.bsModal) {
      this.bsModal.show();
    }
  }

  closeModal(): void {
    if (this.bsModal) {
      this.bsModal.hide();
    }
    if (this.onCloseCallback) {
      this.onCloseCallback(); //executa o callback ao fechar o modal
      this.onCloseCallback = null; //reseta o callback após execução
    }
  }
}