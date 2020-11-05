import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesFormularioComponent } from './clientes-formulario.component';

describe('ClientesFormularioComponent', () => {
  let component: ClientesFormularioComponent;
  let fixture: ComponentFixture<ClientesFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientesFormularioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientesFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
