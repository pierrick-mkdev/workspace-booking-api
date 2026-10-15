import { Injectable, inject, Type } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private dialog = inject(MatDialog);

  /**
   * Opens any component in a Material modal
   * @param component The component to display in the modal
   * @param data Any data to be passed to the modal
   * @param config Optional configuration (width, etc.)
   */
  open<T, D = any, R = any>(
    component: Type<T>,
    data?: D,
    config: Partial<MatDialogConfig> = {}
  ): Observable<R | undefined> {
    const dialogRef = this.dialog.open<T, D, R>(component, {
      width: '500px',
      disableClose: false,
      data,
      ...config
    });

    return dialogRef.afterClosed();
  }
}
