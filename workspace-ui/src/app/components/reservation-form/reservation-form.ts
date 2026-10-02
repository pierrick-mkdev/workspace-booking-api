import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Resource } from '../../models/resource';
import { ResourceService } from '../../services/resource';
import { ReservationService } from '../../services/reservation';

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
    MatDatepickerModule
  ],
  templateUrl: './reservation-form.html',
  styleUrl: './reservation-form.scss'
})
export class ReservationFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private resourceService = inject(ResourceService);
  private reservationService = inject(ReservationService);
  private dialogRef = inject(MatDialogRef<ReservationFormComponent>);

  // List of available resources for the dropdown select
  resources = signal<Resource[]>([]);

  reservationForm = this.fb.group({
    resourceId: [null as number | null, [Validators.required]],
    userEmail: ['', [Validators.required, Validators.email]],
    startDate: [null as Date | null, [Validators.required]],
    startTime: ['09:00', [Validators.required]],
    endDate: [null as Date | null, [Validators.required]],
    endTime: ['18:00', [Validators.required]]
  });

  ngOnInit(): void {
    this.loadResources();
  }

  loadResources(): void {
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

    this.reservationService.createReservation({
      resourceId: Number(raw.resourceId),
      userEmail: raw.userEmail!,
      startTime: start.toISOString(),
      endTime: end.toISOString()
    }).subscribe({
      next: () => this.dialogRef.close(true)
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
