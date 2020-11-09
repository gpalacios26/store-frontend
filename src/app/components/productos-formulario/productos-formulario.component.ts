import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Producto } from '../../models/producto';
import { ProductoService } from '../../services/producto.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-productos-formulario',
  templateUrl: './productos-formulario.component.html',
  styleUrls: ['./productos-formulario.component.css'],
  providers: [ProductoService]
})
export class ProductosFormularioComponent implements OnInit {

  public id: number;
  public edicion: boolean;
  public producto: Producto;
  public titulo: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productoService: ProductoService,
    private snackBar: MatSnackBar
  ) {
    this.producto = new Producto(0, '', '', null);
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (params['id'] != null) {
        this.id = params['id'];
        this.edicion = true;
        this.titulo = "Editar Producto";
        this.getProducto();
      } else {
        this.edicion = false;
        this.titulo = "Agregar Producto";
      }
    });
  }

  getProducto() {
    this.productoService.listarPorId(this.id).subscribe(
      response => {
        this.producto = response;
      },
      error => {
        console.log(error);
        this.router.navigate(['productos']);
        this.snackBar.open('Ocurrio un error en la consulta', 'AVISO', { duration: 2000 });
      }
    );
  }

  guardar() {
    let peticion: Observable<any>;
    let mensaje: string;

    if (this.edicion) {
      peticion = this.productoService.modificar(this.producto);
      mensaje = 'Producto actualizado correctamente';
    } else {
      peticion = this.productoService.registrar(this.producto);
      mensaje = 'Producto registrado correctamente';
    }

    peticion.subscribe(
      response => {
        this.producto = response;
        this.router.navigate(['productos']);
        this.snackBar.open(mensaje, 'AVISO', { duration: 2000 });
      },
      error => {
        console.log(error);
        this.snackBar.open('Ocurrio un error, vuelva a intentarlo', 'AVISO', { duration: 2000 });
      }
    );
  }

}
