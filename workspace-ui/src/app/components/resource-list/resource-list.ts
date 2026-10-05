import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ResourceService } from '../../services/resource';
import { Resource } from '../../models/resource';
import { DialogService } from '../../services/dialog';
import { ResourceFormComponent } from '../resource-form/resource-form';
import { NotificationService } from '../../services/notification';
import { LoadingSpinner } from '../loading-spinner/loading-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SearchInput } from '../search-input/search-input';

@Component({
  selector: 'app-resource-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    LoadingSpinner,
    SearchInput
  ],
  templateUrl: './resource-list.html',
  styleUrl: './resource-list.scss'
})

export class ResourceListComponent implements OnInit {
  private resourceService = inject(ResourceService);
  private dialogService = inject(DialogService);
  private notificationService = inject(NotificationService);

  resources = signal<Resource[]>([]);
  loading = signal<boolean>(true);
  searchQuery = signal<string>('');
  filteredResources = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    if (!query) return this.resources();

    return this.resources().filter(res =>
      res.name.toLowerCase().includes(query)
    );
  });

  readonly seatMapping: { [k: string]: string } = {
    '=1': '1 seat',
    'other': '# seats'
  };

  ngOnInit(): void {
    this.loadResources();
  }

  loadResources(): void {
    this.loading.set(true);
    this.resourceService.getResources()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (data) => this.resources.set(data)
      });
  }

  onDelete(id: number): void {
    if (confirm('Would you like to delete this workspace ?')) {
      this.resourceService.deleteResource(id).subscribe({
        next: () => {
          this.notificationService.showSuccess('Workspace deleted successfully!');
          this.loadResources();
        }
      });
    }
  }

  openResourceModal(resourceToEdit?: Resource): void {
    this.dialogService.open(ResourceFormComponent, resourceToEdit, { width: '600px' }).subscribe(saved => {
      if (saved) {
        this.loadResources();
      }
    });
  }
}
