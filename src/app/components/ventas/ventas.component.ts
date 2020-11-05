import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Venta } from '../../models/venta';
import { VentaService } from '../../services/venta.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css'],
  providers: [VentaService]
})
export class VentasComponent implements OnInit {

  public displayedColumns = ['idVenta', 'fecha', 'cliente', 'importe'];
  public dataSource: MatTableDataSource<Venta>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private ventaService: VentaService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getVentas();
  }

  getVentas() {
    this.ventaService.getVentas().subscribe(
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

}
