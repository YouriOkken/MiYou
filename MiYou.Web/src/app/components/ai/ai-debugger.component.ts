import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AiConsoleComponent } from "./console/ai-console.component";

@Component({
  selector: 'app-ai-debugger',
  templateUrl: './ai-debugger.component.html',
  styleUrls: ['./ai-debugger.component.scss'],
  imports: [FormsModule, AiConsoleComponent]
})
export class AiDebuggerComponent {
  code: string = '';
  question: string = '';
  response: string = '';
  loading: boolean = false;

  constructor(private http: HttpClient) {}

  submitPrompt() {
    this.loading = true;
    const body = {
      code: this.code,
      question: this.question
    };

    this.http.post<any>('https://localhost:5001/api/ai/code-debug', body)
      .subscribe({
        next: (res) => {
          // res is al een object, niet een string
          this.response = res.choices?.[0]?.message?.content || 'Geen antwoord ontvangen.';
          this.loading = false;
        },
        error: (err) => {
          console.error(err);
          this.response = 'Fout bij ophalen van AI-antwoord.';
          this.loading = false;
        }
    });
  }
}
