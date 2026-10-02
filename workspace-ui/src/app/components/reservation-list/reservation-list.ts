import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { finalize } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Reservation } from '../../models/reservation';
import { ReservationService } from '../../services/reservation';
import { DialogService } from '../../services/dialog';
import { ReservationFormComponent } from '../reservation-form/reservation-form';

@Component({
  selector: 'app-reservation-list',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './reservation-list.html',
  styleUrl: './reservation-list.scss'
})
export class ReservationListComponent implements OnInit {
  private reservationService = inject(ReservationService);
  private dialogService = inject(DialogService);

  reservations = signal<Reservation[]>([]);
  loading = signal<boolean>(true);

  displayedColumns: string[] = ['resourceName', 'userEmail', 'startTime', 'endTime', 'actions'];

  ngOnInit(): void {
    this.loadReservations();
  }

  loadReservations(): void {
    this.loading.set(true);
    this.reservationService.getReservations()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
      next: (data) => {
        const sorted = [...data].sort((a, b) => {
          const timeA = new Date(a.startTime).getTime();
          const timeB = new Date(b.startTime).getTime();
          return timeA - timeB;
        });
        this.reservations.set(sorted);
      }
    });
  }

  onCancel(id: number): void {
    if (confirm('Are you sure you want to cancel this reservation?')) {
      this.reservationService.cancelReservation(id).subscribe({
        next: () => this.loadReservations()
      });
    }
  }

  openReservationModal(): void {
    this.dialogService.open(ReservationFormComponent).subscribe(created => {
      if (created) {
        this.loadReservations();
      }
    });
  }
}
