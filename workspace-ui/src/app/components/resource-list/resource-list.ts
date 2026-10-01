import { Component, OnInit, inject, signal, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';
import { ResourceService } from '../../services/resource';
import { Resource } from '../../models/resource';

@Component({
  selector: 'app-resource-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resource-list.html',
  styleUrl: './resource-list.scss'
})

export class ResourceListComponent implements OnInit {
  private resourceService = inject(ResourceService);

  resources = signal<Resource[]>([]);
  loading = signal<boolean>(true);

  editRequested = output<Resource>();

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

  onEdit(resource: Resource): void {
    this.editRequested.emit(resource);
  }

  onDelete(id: number): void {
    if (confirm('Would you like to delete this workspace ?')) {
      this.resourceService.deleteResource(id).subscribe({
        next: () => {
          // Refresh the resource list after deletion
          this.loadResources();
        }
      });
    }
  }
}
