import { Component, inject, OnInit, viewChild } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { ResourceListComponent } from './components/resource-list/resource-list';
import { ReservationListComponent } from './components/reservation-list/reservation-list';
import { AuthService } from './services/auth';
import { RoleSwitcher } from './components/role-switcher/role-switcher';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatTabsModule,
    MatIconModule,
    ResourceListComponent,
    ReservationListComponent,
    RoleSwitcher
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  title = 'workspace-ui';
  readonly resourceList = viewChild(ResourceListComponent);
  readonly reservationList = viewChild(ReservationListComponent);
  private authService = inject(AuthService);

  ngOnInit() {
    if (!this.authService.getToken()) {
      this.authService.switchRole('Admin').subscribe();
    }
  }

  onTabChange(index: number): void {
    if (index === 0) {
      this.resourceList()?.loadResources();
    } else if (index === 1) {
      this.reservationList()?.loadReservations();
    }
  }
}
