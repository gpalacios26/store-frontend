// Importar los modulos del router de angular
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Importar los componentes que voy a generar su pagina
import { HomeComponent } from './components/home/home.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ClientesFormularioComponent } from './components/clientes-formulario/clientes-formulario.component';
import { ProductosComponent } from './components/productos/productos.component';
import { ProductosFormularioComponent } from './components/productos-formulario/productos-formulario.component';
import { VentasComponent } from './components/ventas/ventas.component';
import { VentasFormularioComponent } from './components/ventas-formulario/ventas-formulario.component';

// Array de rutas
const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'inicio', component: HomeComponent },
    { path: 'clientes', component: ClientesComponent },
    { path: 'clientes/agregar', component: ClientesFormularioComponent },
    { path: 'clientes/editar/:id', component: ClientesFormularioComponent },
    { path: 'productos', component: ProductosComponent },
    { path: 'productos/agregar', component: ProductosFormularioComponent },
    { path: 'productos/editar/:id', component: ProductosFormularioComponent },
    { path: 'ventas', component: VentasComponent },
    { path: 'ventas/agregar', component: VentasFormularioComponent },
    { path: '**', component: HomeComponent }
];

// Exportar modulo de rutas
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);