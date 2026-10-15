import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  styleUrl: './loading-spinner.scss',
  templateUrl: './loading-spinner.html',
})
export class LoadingSpinner {
  loading = input<boolean>(false);
  diameter = input<number>(40);
}
