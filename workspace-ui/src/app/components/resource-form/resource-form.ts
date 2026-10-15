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

  selectedFile: File | null = null;
  fileName: string = '';
  imagePreview = signal<string | null>(null);

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

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.fileName = file.name;

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview.set(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.resourceForm.valid) {
      const formData = new FormData();
      formData.append('Name', this.resourceForm.get('name')?.value || '');
      formData.append('Capacity', String(this.resourceForm.get('capacity')?.value || 1));

      if (this.selectedFile) {
        formData.append('Image', this.selectedFile, this.selectedFile.name);
      }

      if (this.resourceToEdit) {
        formData.append('Id', String(this.resourceToEdit.id));
        this.editResource(this.resourceToEdit.id, formData);
      } else {
        this.createResource(formData);
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  createResource(formData: FormData): void {
    this.resourceService.createResource(formData).subscribe({
      next: () => {
        this.notificationService.showSuccess('Workspace created successfully!');
        this.dialogRef.close(true);
      }
    });
  }

  editResource(id: number, formData: FormData): void {
    this.resourceService.updateResource(id, formData).subscribe({
      next: () => {
        this.notificationService.showSuccess('Workspace modified successfully!');
        this.dialogRef.close(true)
      }
    });
  }
}
