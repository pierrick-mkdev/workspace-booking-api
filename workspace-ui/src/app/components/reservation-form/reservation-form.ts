import { Component, inject, OnInit, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Resource } from '../../models/resource';
import { ResourceService } from '../../services/resource';
import { ReservationService } from '../../services/reservation';

@Component({
  selector: 'app-reservation-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './reservation-form.html',
  styleUrl: './reservation-form.scss'
})
export class ReservationFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private resourceService = inject(ResourceService);
  private reservationService = inject(ReservationService);

  // Event emitted to parent component after successful creation
  reservationSaved = output<void>();

  // List of available resources for the dropdown select
  resources = signal<Resource[]>([]);

  reservationForm = this.fb.group({
    resourceId: [null as number | null, [Validators.required]],
    userEmail: ['', [Validators.required, Validators.email]],
    startTime: ['', [Validators.required]],
    endTime: ['', [Validators.required]]
  });

  ngOnInit(): void {
    this.loadResources();
  }

  loadResources(): void {
    this.resourceService.getResources().subscribe({
      next: (data) => this.resources.set(data),
      error: (err) => console.error('Error loading resources', err)
    });
  }

  onSubmit(): void {
    if (this.reservationForm.invalid) return;

    const rawValue = this.reservationForm.getRawValue();

    this.reservationService.createReservation({
      resourceId: Number(rawValue.resourceId),
      userEmail: rawValue.userEmail!,
      startTime: new Date(rawValue.startTime!).toISOString(),
      endTime: new Date(rawValue.endTime!).toISOString()
    }).subscribe({
      next: () => {
        this.reservationForm.reset();
        this.reservationSaved.emit();
      },
      error: (err) => {
        console.error('Error creating reservation', err);
      }
    });
  }
}
