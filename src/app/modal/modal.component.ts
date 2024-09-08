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

  constructor() { }

  ngAfterViewInit() {
    this.modalElement = document.getElementById('genericModal') as HTMLElement;
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