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

  createResource(formData: FormData): Observable<Resource> {
    return this.http.post<Resource>(this.apiUrl, formData);
  }

  updateResource(id: number, formData: FormData): Observable<Resource> {
    return this.http.put<Resource>(`${this.apiUrl}/${id}`, formData);
  }

  deleteResource(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
