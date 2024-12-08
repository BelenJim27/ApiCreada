import { Routes } from '@angular/router';
import { ProductosComponent } from './productos/productos.component';
import { SiderbarComponent } from './sidebar/sidebar.component';
import LoginComponent from './login/login.component';
import { UserListComponent } from './user-list/user-list.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirige al login
  { path: 'login', component: LoginComponent }, // Ruta explícita para login
    {
        path: 'sidebar',
        component: SiderbarComponent,
        children: [
          
          { path: 'productos', component: ProductosComponent },
          { path: 'usuarios', component: UserListComponent },
          { path: '', redirectTo: 'productos', pathMatch: 'full' },
        ]
      },
      { path: '**', redirectTo: 'login' } // Manejo de rutas no encontradas
];
