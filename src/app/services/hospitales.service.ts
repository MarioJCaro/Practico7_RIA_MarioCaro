import { Injectable } from '@angular/core';
import { Hospital } from '../models/hospital';
import { Observable, delay, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HospitalesService {

  private apiUrl = 'http://localhost:3000/hospitales';

  constructor(private http: HttpClient) { }
  // Obtener la lista de hospitales
  get(): Observable<Hospital[]> {
  return this.http.get<Hospital[]>(this.apiUrl);
  }

  // Obtener un hospital por su ID
  getById(id: number): Observable<Hospital> {
  return this.http.get<Hospital>(`${this.apiUrl}/${id}`);
  }

  // Agregar un nuevo hospital
 add(hospital: Hospital): Observable<Hospital> {
  return this.http.post<Hospital>(this.apiUrl, hospital, { });
  }

  // Actualizar un hospital existente
  update(hospital: Hospital): Observable<Hospital> {
  return this.http.put<Hospital>(`${this.apiUrl}/${hospital.id}`, hospital, { });
  }

  // Eliminar un hospital existente
  delete(id: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/${id}`);
  }

 
}
