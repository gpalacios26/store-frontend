import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Producto } from '../../models/producto';
import { ProductoService } from '../../services/producto.service';

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
    this.route.params.subscribe(params => {
      if (params['id'] != null) {
        this.id = params['id'];
        this.edicion = true;
        this.getProducto();
        this.titulo = "Editar Producto";
      } else {
        this.edicion = false;
        this.titulo = "Agregar Producto";
      }
    });
  }

  getProducto() {
    this.productoService.getProducto(this.id).subscribe(
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

  onSubmit(form) {
    if (this.edicion) {
      this.productoService.updateProducto(this.producto).subscribe(
        response => {
          this.producto = response;
          this.snackBar.open('Producto actualizado correctamente', 'AVISO', { duration: 2000 });
        },
        error => {
          console.log(error);
          this.snackBar.open('Ocurrio un error, vuelva a intentarlo', 'AVISO', { duration: 2000 });
        }
      );
    } else {
      this.productoService.createProducto(this.producto).subscribe(
        response => {
          this.producto = response;
          this.snackBar.open('Producto registrado correctamente', 'AVISO', { duration: 2000 });
        },
        error => {
          console.log(error);
          this.snackBar.open('Ocurrio un error, vuelva a intentarlo', 'AVISO', { duration: 2000 });
        }
      );
    }

    this.router.navigate(['productos']);
  }

}
