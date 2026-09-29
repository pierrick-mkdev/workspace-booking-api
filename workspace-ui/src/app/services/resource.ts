import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Resource } from '../models/resource';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/resources`;

  getResources(): Observable<Resource[]> {
    return this.http.get<Resource[]>(this.apiUrl);
  }

  createResource(resource: Omit<Resource, 'id'>): Observable<Resource> {
    return this.http.post<Resource>(this.apiUrl, resource);
  }

  updateResource(id: number, resource: Omit<Resource, 'id'>): Observable<Resource> {
    const body = { id, ...resource };
    return this.http.put<Resource>(`${this.apiUrl}/${id}`, body);
  }

  deleteResource(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
