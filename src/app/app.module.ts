import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MomentModule } from 'angular2-moment';
import { routing, appRoutingProviders } from './app.routing';

// Angular Material
import { MaterialModule } from './material';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ProductosComponent } from './components/productos/productos.component';
import { VentasComponent } from './components/ventas/ventas.component';
import { ClientesFormularioComponent } from './components/clientes-formulario/clientes-formulario.component';
import { ProductosFormularioComponent } from './components/productos-formulario/productos-formulario.component';
import { VentasFormularioComponent } from './components/ventas-formulario/ventas-formulario.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ClientesComponent,
    ProductosComponent,
    VentasComponent,
    ClientesFormularioComponent,
    ProductosFormularioComponent,
    VentasFormularioComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    MomentModule,
    routing
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
