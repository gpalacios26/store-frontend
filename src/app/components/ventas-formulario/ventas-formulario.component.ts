import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Persona } from '../../models/persona';
import { PersonaService } from '../../services/persona.service';
import { Producto } from '../../models/producto';
import { ProductoService } from '../../services/producto.service';
import { Venta } from '../../models/venta';
import { DetalleVenta } from '../../models/detalle-venta';
import { VentaService } from '../../services/venta.service';

@Component({
  selector: 'app-ventas-formulario',
  templateUrl: './ventas-formulario.component.html',
  styleUrls: ['./ventas-formulario.component.css'],
  providers: [PersonaService, ProductoService, VentaService]
})
export class VentasFormularioComponent implements OnInit {

  public form: FormGroup;
  public personas: Persona[];
  public productos: Producto[];
  public venta: Venta;
  public detalleVenta: DetalleVenta[];
  public importe: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private personaService: PersonaService,
    private productoService: ProductoService,
    private ventaService: VentaService,
    private snackBar: MatSnackBar
  ) {
    this.crearFormulario();
    this.importe = 0;
  }

  ngOnInit() {
    this.getPersonas();
    this.getProductos();
  }

  get list_detalle_venta() {
    return this.form.get('list_detalle_venta') as FormArray;
  }

  crearFormulario() {
    this.form = this.fb.group({
      venta: this.fb.group({
        fecha: ['', Validators.required],
        persona: this.fb.group({
          idPersona: ['', Validators.required]
        }),
        importe: ['0']
      }),
      list_detalle_venta: this.fb.array([this.crearItem()])
    });
  }

  crearItem(): FormGroup {
    return this.fb.group({
      venta: this.fb.group({
        idVenta: ['0']
      }),
      producto: this.fb.group({
        idProducto: ['', Validators.required]
      }),
      cantidad: ['', Validators.required]
    });
  }

  agregarItem() {
    this.list_detalle_venta.push(this.crearItem());
  }

  borrarItem(i: number) {
    this.list_detalle_venta.removeAt(i);
    this.calcularImporte();
  }

  seleccionarProducto(i: number) {
    let productos = [];
    this.list_detalle_venta.controls.forEach(control => {
      let fila = control.value;
      let idProducto = fila.producto.idProducto;
      productos.push(idProducto);
    });

    let fila = this.list_detalle_venta.controls[i].value;
    let idProducto = fila.producto.idProducto;

    let resultado = productos.filter((item) => {
      return item == idProducto;
    });

    if (resultado.length > 1) {
      this.snackBar.open('No se puede elegir productos repetidos', 'AVISO', { duration: 2000 });
      this.list_detalle_venta.controls[i].value.producto.idProducto = null;
      let formulario = this.form.value;
      this.form.reset(formulario);
    }

    this.calcularImporte();
  }

  calcularImporte() {
    let total = 0;
    this.list_detalle_venta.controls.forEach(control => {
      let fila = control.value;
      let idProducto = fila.producto.idProducto;
      let cantidad = fila.cantidad;
      let producto = this.productos.filter((item) => {
        return item.idProducto == idProducto;
      });
      let subtotal = 0;
      if (cantidad && producto) {
        subtotal = producto[0].precio * cantidad;
      }
      total = total + subtotal;
    });

    this.importe = total;
    this.form.controls.venta.value.importe = this.importe;
    let formulario = this.form.value;
    this.form.reset(formulario);
  }

  getPersonas() {
    this.personaService.getPersonas().subscribe(
      response => {
        this.personas = response;

        this.personas.unshift({
          idPersona: null,
          nombres: 'Seleccione',
          apellidos: 'Cliente'
        });
      },
      error => {
        console.log(error);
        this.router.navigate(['ventas']);
        this.snackBar.open('Ocurrio un error en la consulta', 'AVISO', { duration: 2000 });
      }
    );
  }

  getProductos() {
    this.productoService.getProductos().subscribe(
      response => {
        this.productos = response;

        this.productos.unshift({
          idProducto: null,
          nombre: 'Seleccione',
          marca: 'Producto',
          precio: null
        });
      },
      error => {
        console.log(error);
        this.router.navigate(['ventas']);
        this.snackBar.open('Ocurrio un error en la consulta', 'AVISO', { duration: 2000 });
      }
    );
  }

  onSubmit() {
    this.ventaService.createVenta(this.form.value).subscribe(
      response => {
        this.venta = response;
        this.snackBar.open('Venta registrada correctamente', 'AVISO', { duration: 2000 });
      },
      error => {
        console.log(error);
        this.snackBar.open('Ocurrio un error, vuelva a intentarlo', 'AVISO', { duration: 2000 });
      }
    );

    this.router.navigate(['ventas']);
  }

}
