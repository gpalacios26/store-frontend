import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentasFormularioComponent } from './ventas-formulario.component';

describe('VentasFormularioComponent', () => {
  let component: VentasFormularioComponent;
  let fixture: ComponentFixture<VentasFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentasFormularioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VentasFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
