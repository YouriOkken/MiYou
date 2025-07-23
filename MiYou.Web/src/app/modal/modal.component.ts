import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * De MiYouModal component toont een modaal venster
 * dat je kunt openen en sluiten met een animatie.
 *
 * @example
 * <miyou-modal [visible]="variable" [title]="Form Titel" (close)="onClose()">Inhoud</miyou-modal>
 */
@Component({
  selector: 'miyou-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  imports: [CommonModule]
})
export class ModalComponent {
  @Output() close = new EventEmitter<void>();
  @Output() ok = new EventEmitter<void>();
  @Input() title: string = "MiYou";
  @Input() visible: boolean = false;
  @Input() showCloseButton: boolean = true;
  @Input() showCloseX: boolean = true;
  @Input() showOKButton: boolean = false;
  @Input() OKButtonLabel: string = "Oke";

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

  onOk() {
    this.isClosing = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isClosing = false;
      this.ok.emit();
    }, 500);
  }
}
