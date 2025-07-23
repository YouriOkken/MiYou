import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'miyou-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss'],
})
export class SwitchComponent {
  @Input() toggled: boolean = false;
  @Input() fixed: boolean = false;
  @Output() toggledChange = new EventEmitter<boolean>();

  onToggle(event: Event) {
    if (this.fixed) return; 

    const checked = (event.target as HTMLInputElement).checked;
    this.toggled = checked;
    this.toggledChange.emit(checked);
  }
}