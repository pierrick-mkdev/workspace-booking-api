import { Component, inject, output, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ResourceService } from '../../services/resource';
import { Resource } from '../../models/resource';

type ResourceFormData = Omit<Resource, 'id'>;

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-resource-form',
  standalone: true,
  styleUrl: './resource-form.scss',
  templateUrl: './resource-form.html',
})
export class ResourceFormComponent {
  private fb = inject(FormBuilder);
  private resourceService = inject(ResourceService);

  // Event to refresh HTML with the new resource created
  resourceSaved = output<void>();

  // Retains the id if in edit mode (null if in creation mode)
  editingId = signal<number | null>(null);

  // Form configuration with its validation rules
  resourceForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    capacity: [1, [Validators.required, Validators.min(1)]],
    isAvailable: [true]
  });

  setFormForEdit(resource: Resource): void {
    this.editingId.set(resource.id);
    this.resourceForm.patchValue({
      name: resource.name,
      capacity: resource.capacity,
      isAvailable: resource.isAvailable
    });
  }

  resetForm(): void {
    this.editingId.set(null);
    this.resourceForm.reset({ capacity: 1, isAvailable: true });
  }

  onSubmit(): void {
    if (this.resourceForm.valid) {
      const resourceData = this.resourceForm.getRawValue() as ResourceFormData;
      const currentId = this.editingId();

      if (currentId !== null) {
        this.editResource(currentId, resourceData);
      } else {
        this.createResource(resourceData);
      }
    }
  }

  createResource(resourceData: ResourceFormData): void {
    this.resourceService.createResource(resourceData).subscribe({
      next: () => {
        this.resetForm();
        this.resourceSaved.emit(); // Success notification
      },
      error: (err) => console.error('Creation error:', err)
    });
  }

  editResource(id: number, resourceData: ResourceFormData): void {
    this.resourceService.updateResource(id, resourceData).subscribe({
      next: () => {
        this.resetForm();
        this.resourceSaved.emit();
      },
      error: (err) => console.error('Edit error :', err)
    });
  }
}
