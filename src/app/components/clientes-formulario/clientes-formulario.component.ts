import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Persona } from '../../models/persona';
import { PersonaService } from '../../services/persona.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-clientes-formulario',
  templateUrl: './clientes-formulario.component.html',
  styleUrls: ['./clientes-formulario.component.css'],
  providers: [PersonaService]
})
export class ClientesFormularioComponent implements OnInit {

  public id: number;
  public edicion: boolean;
  public persona: Persona;
  public titulo: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private personaService: PersonaService,
    private snackBar: MatSnackBar
  ) {
    this.persona = new Persona(0, '', '');
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (params['id'] != null) {
        this.id = params['id'];
        this.edicion = true;
        this.titulo = "Editar Cliente";
        this.getPersona();
      } else {
        this.edicion = false;
        this.titulo = "Agregar Cliente";
      }
    });
  }

  getPersona() {
    this.personaService.listarPorId(this.id).subscribe(
      response => {
        this.persona = response;
      },
      error => {
        console.log(error);
        this.router.navigate(['clientes']);
        this.snackBar.open('Ocurrio un error en la consulta', 'AVISO', { duration: 2000 });
      }
    );
  }

  guardar() {
    let peticion: Observable<any>;
    let mensaje: string;

    if (this.edicion) {
      peticion = this.personaService.modificar(this.persona);
      mensaje = 'Cliente actualizado correctamente';
    } else {
      peticion = this.personaService.registrar(this.persona);
      mensaje = 'Cliente registrado correctamente';
    }

    peticion.subscribe(
      response => {
        this.persona = response;
        this.router.navigate(['clientes']);
        this.snackBar.open(mensaje, 'AVISO', { duration: 2000 });
      },
      error => {
        console.log(error);
        this.snackBar.open('Ocurrio un error, vuelva a intentarlo', 'AVISO', { duration: 2000 });
      }
    );
  }

}