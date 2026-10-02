import { Component, viewChild } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { ResourceListComponent } from './components/resource-list/resource-list';
import { ReservationListComponent } from './components/reservation-list/reservation-list';
import { ErrorBannerComponent } from './components/error-banner/error-banner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatTabsModule,
    MatIconModule,
    ResourceListComponent,
    ReservationListComponent,
    ErrorBannerComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  title = 'workspace-ui';
  readonly resourceList = viewChild(ResourceListComponent);
  readonly reservationList = viewChild(ReservationListComponent);

  onTabChange(index: number): void {
    if (index === 0) {
      this.resourceList()?.loadResources();
    } else if (index === 1) {
      this.reservationList()?.loadReservations();
    }
  }
}
