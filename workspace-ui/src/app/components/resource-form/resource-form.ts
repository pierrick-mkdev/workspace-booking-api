import { Component, inject, output, signal, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ResourceService } from '../../services/resource';
import { Resource } from '../../models/resource';
import { NotificationService } from '../../services/notification';

type ResourceFormData = Omit<Resource, 'id'>;

@Component({
  selector: 'app-resource-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './resource-form.html',
  styleUrl: './resource-form.scss',
})
export class ResourceFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private resourceService = inject(ResourceService);
  private dialogRef = inject(MatDialogRef<ResourceFormComponent>);
  private notificationService = inject(NotificationService);

  public resourceToEdit = inject<Resource | null>(MAT_DIALOG_DATA, { optional: true });

  // Form configuration with its validation rules
  resourceForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    capacity: [1, [Validators.required, Validators.min(1)]]
  });

  ngOnInit(): void {
    if (this.resourceToEdit) {
      this.resourceForm.patchValue({
        name: this.resourceToEdit.name,
        capacity: this.resourceToEdit.capacity
      });
    }
  }

  onSubmit(): void {
    if (this.resourceForm.valid) {
      const resourceData = this.resourceForm.getRawValue() as ResourceFormData;

      if (this.resourceToEdit) {
        this.editResource(this.resourceToEdit.id, resourceData);
      } else {
        this.createResource(resourceData);
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  createResource(resourceData: ResourceFormData): void {
    this.resourceService.createResource(resourceData).subscribe({
      next: () => {
        this.notificationService.showSuccess('Workspace created successfully!');
        this.dialogRef.close(true);
      }
    });
  }

  editResource(id: number, resourceData: ResourceFormData): void {
    this.resourceService.updateResource(id, resourceData).subscribe({
      next: () => {
        this.notificationService.showSuccess('Workspace modified successfully!');
        this.dialogRef.close(true)
      }
    });
  }
}
