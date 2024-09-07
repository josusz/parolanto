import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-error-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-modal.component.html',
  styleUrl: './error-modal.component.css'
})
export class ErrorModalComponent {
  @Input() errorMessages: string[] = [];

  private modalElement: HTMLElement | null = null; // inicialização com null
  private bsModal?: Modal; // uso de undefined como padrão

  constructor() { }

  ngAfterViewInit() {
    this.modalElement = document.getElementById('errorModal') as HTMLElement;
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