import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilUsuarioAutenticadoComponent } from './perfil-usuario-autenticado.component';

describe('PerfilUsuarioAutenticadoComponent', () => {
  let component: PerfilUsuarioAutenticadoComponent;
  let fixture: ComponentFixture<PerfilUsuarioAutenticadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilUsuarioAutenticadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilUsuarioAutenticadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
