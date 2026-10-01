import { Component, ViewChild } from '@angular/core';
import { ResourceListComponent } from './components/resource-list/resource-list';
import { ResourceFormComponent } from './components/resource-form/resource-form';
import { ReservationFormComponent } from './components/reservation-form/reservation-form';
import { ReservationListComponent } from './components/reservation-list/reservation-list';
import { ErrorBannerComponent } from './components/error-banner/error-banner';
import { Resource } from './models/resource';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ResourceListComponent,
    ResourceFormComponent,
    ReservationFormComponent,
    ReservationListComponent,
    ErrorBannerComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  title = 'workspace-ui';

  @ViewChild(ResourceFormComponent) resourceForm!: ResourceFormComponent;
  @ViewChild(ResourceListComponent) resourceList!: ResourceListComponent;
  @ViewChild(ReservationListComponent) reservationList!: ReservationListComponent;

  onResourceSaved(): void {
    this.resourceList?.loadResources();
  }

  onEditRequested(resource: Resource): void {
    this.resourceForm?.setFormForEdit(resource);
  }

  onReservationSaved(): void {
    this.reservationList.loadReservations();
  }
}
