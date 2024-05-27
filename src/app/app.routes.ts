import { Routes } from '@angular/router';
import { TestComponent } from './test/test.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { HospitalesNuevoComponent } from './hospitales-nuevo/hospitales-nuevo.component';
import { HospitalesEditarComponent } from './hospitales-editar/hospitales-editar.component';

export const routes: Routes = [
    {
        path:'test',
        component: TestComponent
    },
    {
        path: 'hospitales',
        component: HospitalesComponent
    },
    {
        path:'agregar',
        component: HospitalesNuevoComponent
    },
    {
        path:'editar/:id',
        component: HospitalesEditarComponent
    }
];
