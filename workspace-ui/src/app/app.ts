import { Component, ViewChild } from '@angular/core';
import { ResourceListComponent } from './components/resource-list/resource-list';
import { ResourceFormComponent } from './components/resource-form/resource-form';
import { Resource } from './models/resource';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ResourceListComponent, ResourceFormComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  title = 'workspace-ui';

  @ViewChild(ResourceFormComponent) resourceForm!: ResourceFormComponent;
  @ViewChild(ResourceListComponent) resourceList!: ResourceListComponent;

  onResourceSaved(): void {
    this.resourceList?.loadResources();
  }

  onEditRequested(resource: Resource): void {
    this.resourceForm?.setFormForEdit(resource);
  }
}
