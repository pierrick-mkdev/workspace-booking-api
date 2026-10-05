import { Component, inject, OnInit, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { Resource } from '../../models/resource';
import { ResourceService } from '../../services/resource';
import { ReservationService } from '../../services/reservation';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NotificationService } from '../../services/notification';

export const dateTimeRangeValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const startDate = control.get('startDate')?.value;
  const startTime = control.get('startTime')?.value;
  const endDate = control.get('endDate')?.value;
  const endTime = control.get('endTime')?.value;

  if (!startDate || !startTime || !endDate || !endTime) {
    return null;
  }

  const start = new Date(startDate);
  const [startHours, startMinutes] = startTime.split(':').map(Number);
  start.setHours(startHours, startMinutes, 0, 0);

  const end = new Date(endDate);
  const [endHours, endMinutes] = endTime.split(':').map(Number);
  end.setHours(endHours, endMinutes, 0, 0);

  return end > start ? null : { invalidRange: true };
};

@Component({
  selector: 'app-reservation-form',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule
  ],
  templateUrl: './reservation-form.html',
  styleUrl: './reservation-form.scss'
})
export class ReservationFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private resourceService = inject(ResourceService);
  private reservationService = inject(ReservationService);
  private dialogRef = inject(MatDialogRef<ReservationFormComponent>);
  private notificationService = inject(NotificationService);

  // List of available resources for the dropdown select
  resources = signal<Resource[]>([]);
  reservationForm = this.fb.group({
    resourceId: ['', [Validators.required]],
    userEmail: ['', [Validators.required, Validators.email]],
    startDate: [new Date(), [Validators.required]],
    startTime: ['09:00', [Validators.required]],
    endDate: [new Date(), [Validators.required]],
    endTime: ['18:00', [Validators.required]]
  }, { validators: dateTimeRangeValidator });

  ngOnInit(): void {
    this.loadResources();
  }

  private loadResources(): void {
    this.resourceService.getResources().subscribe({
      next: (data) => this.resources.set(data)
    });
  }

  private combineDateAndTime(date: Date, timeStr: string): Date {
    const [hours, minutes] = timeStr.split(':').map(Number);
    const result = new Date(date);
    result.setHours(hours, minutes, 0, 0);
    return result;
  }

  onSubmit(): void {
    if (this.reservationForm.invalid) return;

    const raw = this.reservationForm.getRawValue();
    const start = this.combineDateAndTime(raw.startDate!, raw.startTime!);
    const end = this.combineDateAndTime(raw.endDate!, raw.endTime!);

    const payload = {
      resourceId: Number(raw.resourceId),
      userEmail: raw.userEmail!,
      startTime: start.toISOString(),
      endTime: end.toISOString()
    };

    this.reservationService.createReservation(payload).subscribe({
      next: () => {
        this.notificationService.showSuccess('Reservation created successfully!');
        this.dialogRef.close(true);
      },
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
