import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosFormularioComponent } from './productos-formulario.component';

describe('ProductosFormularioComponent', () => {
  let component: ProductosFormularioComponent;
  let fixture: ComponentFixture<ProductosFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductosFormularioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductosFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
