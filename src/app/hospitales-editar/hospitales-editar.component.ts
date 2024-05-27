import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HospitalesService } from '../services/hospitales.service';
import { HttpClientModule } from '@angular/common/http';
import { Hospital } from '../models/hospital';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-hospitales-editar',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [HospitalesService],
  templateUrl: './hospitales-editar.component.html',
  styleUrls: ['./hospitales-editar.component.scss']
})
export class HospitalesEditarComponent implements OnInit {
  hospitalForm: FormGroup;
  hospitalId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private hospitalesService: HospitalesService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {
    this.hospitalForm = this.fb.group({
      nombre: ['', Validators.required],
      direccion: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.hospitalId = +params.get('id')!;
      if (this.hospitalId) {
        this.loadHospitalData(this.hospitalId);
      }
    });
  }

  loadHospitalData(id: number): void {
    this.hospitalesService.getById(id).subscribe({
      next: (hospital: Hospital) => {
        this.hospitalForm.patchValue(hospital);
      },
      error: (error) => {
        console.error('Error loading hospital data', error);
        this.snackBar.open('Error loading hospital data', 'Cerrar', {
          duration: 3000
        });
      }
    });
  }

  onSubmit(): void {
    if (this.hospitalForm.valid && this.hospitalId !== null) {
      const updatedHospital: Hospital = { ...this.hospitalForm.value, id: this.hospitalId };
      this.hospitalesService.update(updatedHospital).subscribe({
        next: (data) => {
          this.snackBar.open('Hospital actualizado exitosamente', 'Cerrar', {
            duration: 3000
          });
          //Voy hacia la lista de hospitales
          this.router.navigate(['/hospitales']);
        },
        error: (error) => {
          console.error('Error updating hospital', error);
          this.snackBar.open('Error updating hospital', 'Cerrar', {
            duration: 3000
          });
        }
      });
    }
  }
}
