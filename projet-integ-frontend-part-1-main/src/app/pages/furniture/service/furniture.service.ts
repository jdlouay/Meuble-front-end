import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Furniture } from '../class/furniture';

@Injectable({
  providedIn: 'root'
})
export class FurnitureService {
 

  private apiUrl = `${environment.apiUrl}/furniture`; // Your backend URL for furniture

  constructor(private http: HttpClient) {}

  // Get all furniture
  getFurniture(): Observable<Furniture[]> {
    return this.http.get<Furniture[]>(this.apiUrl);
  }

  // Get a single furniture item by ID
  getFurnitureById(id: number): Observable<Furniture> {
    return this.http.get<Furniture>(`${this.apiUrl}/${id}`);
  }

  // Create a new furniture item
  createFurniture(furniture: Furniture): Observable<Furniture> {
    return this.http.post<Furniture>(this.apiUrl, furniture);
  }

  // Update an existing furniture item
  updateFurniture(id: number, furniture: Furniture): Observable<Furniture> {
    return this.http.put<Furniture>(`${this.apiUrl}/${id}`, furniture);
  }

  // Delete a furniture item by ID
  deleteFurniture(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}