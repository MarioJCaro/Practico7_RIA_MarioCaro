import { Component } from '@angular/core';
import { Hospital } from '../models/hospital';
import { HospitalesService } from '../services/hospitales.service';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-hospitales',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MatTableModule, MatIcon, MatSnackBarModule, MatProgressSpinnerModule],
  providers: [HospitalesService, HttpClient,],
  templateUrl: './hospitales.component.html',
  styleUrl: './hospitales.component.scss'
})
export class HospitalesComponent {

  public lista: Hospital[] = [];
  public displayedColumns: string[] = ['id', 'nombre', 'direccion', 'acciones'];
  public isLoading = true;

  constructor(private hospitalesService:HospitalesService, private router: Router, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.hospitalesService.get().subscribe({
      next: (data) => {
        this.lista = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error(error);
        this.isLoading = false;
      }
    });
  }

  navigateToEdit(hospitalId: number): void {
    this.router.navigate(['/editar', hospitalId]);
  }

  confirmDelete(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete(id);
      }
    });
  }
  delete(id: number): void {
    this.hospitalesService.delete(id).subscribe({
      next: () => {
        this.lista = this.lista.filter((h) => h.id !== id);
        this.snackBar.open('Hospital eliminado con éxito', 'Cerrar', {
          duration: 3000
        });
      },
      error: (error) => {
        console.error(error);
      }
    });
  } 

}
