import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Persona } from '../../models/persona';
import { PersonaService } from '../../services/persona.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
  providers: [PersonaService]
})
export class ClientesComponent implements OnInit {

  public displayedColumns = ['idPersona', 'nombres', 'apellidos', 'acciones'];
  public dataSource: MatTableDataSource<Persona>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private personaService: PersonaService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getPersonas();
  }

  getPersonas() {
    this.personaService.getPersonas().subscribe(
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
        this.personaService.deletePersona(id).subscribe(
          response => {
            console.log(response);
            this.getPersonas();
            this.snackBar.open('El cliente se ha eliminado correctamente', 'AVISO', { duration: 2000 });
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
