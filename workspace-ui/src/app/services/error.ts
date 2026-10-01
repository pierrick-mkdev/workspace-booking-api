import { inject, Injectable, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NavigationStart, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private router = inject(Router);
  private errorMessageSignal = signal<string | null>(null);
  private timeoutId?: ReturnType<typeof setTimeout>;

  readonly message = this.errorMessageSignal.asReadonly();

  constructor() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.clear();
      }
    });
  }

  setError(err: unknown, fallbackMessage = 'An unexpected error occurred.'): void {
    let messageToDisplay = fallbackMessage;

    if (typeof err === 'string') {
      messageToDisplay = err;
    } else if (err instanceof HttpErrorResponse) {
      const apiError = err.error;
      if (typeof apiError === 'string') {
        messageToDisplay = apiError;
      } else if (apiError?.detail) {
        messageToDisplay = apiError.detail;
      } else if (apiError?.message) {
        messageToDisplay = apiError.message;
      } else if (apiError?.title) {
        messageToDisplay = apiError.title;
      }
    }

    this.errorMessageSignal.set(messageToDisplay);

    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    this.timeoutId = setTimeout(() => this.clear(), 5000);
  }

  clear(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    this.errorMessageSignal.set(null);
  }
}
