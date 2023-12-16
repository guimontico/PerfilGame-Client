import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <div class="row">
        <div class="col">
          <h1>Home</h1>
        </div>
      </div>
    </div>
  `,
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {}
}
