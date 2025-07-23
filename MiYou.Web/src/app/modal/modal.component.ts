import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * De MiYouModal component toont een modaal venster
 * dat je kunt openen en sluiten met een animatie.
 *
 * @example
 * <miyou-modal [visible]="variable" [modalTitle]="Form Titel" (close)="onClose()">Inhoud</miyou-modal>
 */
@Component({
  selector: 'miyou-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  imports: [CommonModule]
})
export class ModalComponent {
  @Output() close = new EventEmitter<void>();
  @Input() modalTitle: string = "MiYou";
  @Input() visible: boolean = false;

  isClosing = false;
  isVisible = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['visible']) {
      if (this.visible) {
        this.isVisible = true;
      } else {
        this.onClose(); // sluit met animatie als parent visible op false zet
      }
    }
  }

  onClose() {
    this.isClosing = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isClosing = false;
      this.close.emit(); // signaal naar parent
    }, 500);
  }
}
