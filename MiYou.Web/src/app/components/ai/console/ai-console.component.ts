// ai-console.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ai-console',
  template: `
    <div class="console">
      <ng-container *ngFor="let block of parsedBlocks">
        <pre *ngIf="block.isCode" class="code-block">{{ block.content }}</pre>
        <div *ngIf="!block.isCode" class="text-block">{{ block.content }}</div>
      </ng-container>
    </div>
  `,
  styleUrls: ['./ai-console.component.scss'],
  imports: [CommonModule]
})
export class AiConsoleComponent {
  @Input() response: string = '';

  get parsedBlocks() {
    // Split op ``` en markeer code
    const parts = this.response.split(/```/);
    return parts.map((part, i) => ({
      isCode: i % 2 === 1,
      content: part.trim()
    }));
  }
}