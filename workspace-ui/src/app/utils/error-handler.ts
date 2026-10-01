import { HttpErrorResponse } from '@angular/common/http';

/**
 * Extracts a user-friendly error message from an HTTP error response.
 * Supports standard string errors, ASP.NET Core ProblemDetails (detail, title), and custom error objects.
 */
export function extractErrorMessage(err: unknown, fallbackMessage = 'An unexpected error occurred.'): string {
  if (!(err instanceof HttpErrorResponse)) {
    return fallbackMessage;
  }

  const apiError = err.error;

  if (typeof apiError === 'string') return apiError;
  if (apiError?.detail) return apiError.detail;
  if (apiError?.message) return apiError.message;
  if (apiError?.title) return apiError.title;

  return fallbackMessage;
}
