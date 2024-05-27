import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { HospitalesService } from '../services/hospitales.service';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { Hospital } from '../models/hospital';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hospitales-nuevo',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MatSnackBarModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule],
  providers: [HospitalesService, HttpClient,],
  templateUrl: './hospitales-nuevo.component.html',
  styleUrl: './hospitales-nuevo.component.scss'
})
export class HospitalesNuevoComponent implements OnInit{
  hospitalForm: FormGroup;
  constructor(
  private fb: FormBuilder,
  private hospitalesService: HospitalesService,
  private snackBar: MatSnackBar,
  private router: Router
  ) {
  this.hospitalForm = this.fb.group({
  nombre: ['', Validators.required],
  direccion: ['', Validators.required]
  });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.hospitalForm.valid) {
    const nuevoHospital: Hospital = this.hospitalForm.value;
    this.hospitalesService.add(nuevoHospital).subscribe({
    next: (data) => {
    this.snackBar.open('Hospital creado exitosamente', 'Cerrar', {
    duration: 3000
    });
    this.hospitalForm.reset();
    //Voy hacia la lista de hospitales
    this.router.navigate(['/hospitales']);
    },
    error: (error) => {
    console.error('Error al crear el hospital', error);
    this.snackBar.open('Error al crear el hospital', 'Cerrar', {
    duration: 3000
    });
    }
    });
    } }

    
}
 
