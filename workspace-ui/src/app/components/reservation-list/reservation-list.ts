import { Component, inject, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Reservation } from '../../models/reservation';
import { ReservationService } from '../../services/reservation';

@Component({
  selector: 'app-reservation-list',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './reservation-list.html',
  styleUrl: './reservation-list.scss'
})
export class ReservationListComponent implements OnInit {
  private reservationService = inject(ReservationService);

  reservations = signal<Reservation[]>([]);

  ngOnInit(): void {
    this.loadReservations();
  }

  loadReservations(): void {
    this.reservationService.getReservations().subscribe({
      next: (data) => this.reservations.set(data),
      error: (err) => console.error('Error loading reservations', err)
    });
  }

  onCancel(id: number): void {
    if (confirm('Are you sure you want to cancel this reservation?')) {
      this.reservationService.cancelReservation(id).subscribe({
        next: () => this.loadReservations(),
        error: (err) => console.error('Error cancelling reservation', err)
      });
    }
  }
}
