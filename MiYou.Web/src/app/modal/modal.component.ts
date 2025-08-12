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
  @Output() okNecessary = new EventEmitter<void>();

  @Input() title: string = "MiYou";
  @Input() visible: boolean = false;
  @Input() showCloseButton: boolean = true;
  @Input() showCloseX: boolean = true;
  @Input() showAllButton: boolean = false;
  @Input() showNecessaryButton: boolean = false;

  @Input() allButtonLabel: string = "Sla allemaal op";
  @Input() necessaryButtonLabel: string = "Alleen essentiële";

  isClosing = false;
  isVisible = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['visible']) {
      if (this.visible) {
        this.isVisible = true;
      } else {
        this.onClose();
      }
    }
  }

  onClose() {
    this.isClosing = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isClosing = false;
      this.close.emit();
    }, 500);
  }

  onOkAll() {
    this.isClosing = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isClosing = false;
      this.ok.emit();
    }, 500);
  }

  onOkNecessary() {
    this.isClosing = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isClosing = false;
      this.okNecessary.emit();
    }, 500);
  }
}
