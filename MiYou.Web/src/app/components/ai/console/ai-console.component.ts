import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ai-console',
  templateUrl: './ai-console.component.html',
  styleUrls: ['./ai-console.component.scss'],
  imports: [CommonModule]
})
export class AiConsoleComponent implements OnChanges {
  @Input() response: string = '';
  parsedBlocks: { isCode: boolean; content: string }[] = [];
  copyMessage: string = '📋';

  get hasCodeBlocks(): boolean {
    return this.parsedBlocks.some(block => block.isCode);
  }

  ngOnChanges() {
    this.parsedBlocks = this.splitResponse(this.response);
  }

  splitResponse(text: string): { isCode: boolean; content: string }[] {
    if (!text?.trim()) return [];

    const parts = text.split(/```/);
    if (parts.length === 1) {
      return [{ isCode: false, content: text.trim() }];
    }

    return parts.map((part, i) => ({
      isCode: i % 2 === 1,
      content: part.trim()
    }));
  }

  async copyCodeToClipboard() {
    const allCode = this.parsedBlocks
      .filter(block => block.isCode)
      .map(block => block.content)
      .join('\n\n');

    try {
      await navigator.clipboard.writeText(allCode);
      this.copyMessage = '✅';
    } catch (err) {
      console.error('Kopiëren mislukt:', err);
      this.copyMessage = '❌';
    }

    setTimeout(() => {
      this.copyMessage = '📋';
    }, 2000);
  }

  async copySingleBlock(content: string) {
    try {
      await navigator.clipboard.writeText(content);
      console.log('Codeblok gekopieerd!');
    } catch (err) {
      console.error('Kopiëren mislukt:', err);
    }
  }

  trackByIndex(index: number): number {
    return index;
  }

  get hasCodeblocks(): boolean {
    return this.parsedBlocks.some(block => block.isCode);
  }
}