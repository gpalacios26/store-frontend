import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Producto } from '../../models/producto';
import { ProductoService } from '../../services/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
  providers: [ProductoService]
})
export class ProductosComponent implements OnInit {

  public displayedColumns = ['idProducto', 'nombre', 'marca', 'precio', 'acciones'];
  public dataSource: MatTableDataSource<Producto>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private productoService: ProductoService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getProductos();
  }

  getProductos() {
    this.productoService.getProductos().subscribe(
      response => {
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
      },
      error => {
        console.log(error);
        this.snackBar.open('Ocurrio un error en la consulta', 'AVISO', { duration: 2000 });
      }
    );
  }

  delete(id) {
    Swal.fire({
      title: 'Alerta',
      text: 'Deseas eliminar el registro seleccionado?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ACEPTAR',
      cancelButtonText: 'CANCELAR'
    }).then((result) => {
      if (result.value) {
        this.productoService.deleteProducto(id).subscribe(
          response => {
            console.log(response);
            this.getProductos();
            this.snackBar.open('El producto se ha eliminado correctamente', 'AVISO', { duration: 2000 });
          },
          error => {
            console.log(error);
            this.snackBar.open('Ocurrio un error, vuelva a intentarlo', 'AVISO', { duration: 2000 });
          }
        );
      }
    });
  }

}
