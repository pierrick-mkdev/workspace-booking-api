import { Component, inject } from '@angular/core';
import { ErrorService } from '../../services/error';

@Component({
  selector: 'app-error-banner',
  standalone: true,
  templateUrl: './error-banner.html',
  styleUrl: './error-banner.scss'
})
export class ErrorBannerComponent {
  protected errorService = inject(ErrorService);
}
