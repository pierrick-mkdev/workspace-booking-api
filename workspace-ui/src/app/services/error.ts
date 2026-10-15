import { inject, Injectable, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NavigationStart, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

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

    this.snackBar.open(messageToDisplay, 'Close', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['error-snackbar']
    });
  }

  clear(): void {
    this.snackBar.dismiss();
  }
}
