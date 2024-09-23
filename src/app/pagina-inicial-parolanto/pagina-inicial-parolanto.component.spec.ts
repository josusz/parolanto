import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaInicialParolantoComponent } from './pagina-inicial-parolanto.component';

describe('PaginaInicialParolantoComponent', () => {
  let component: PaginaInicialParolantoComponent;
  let fixture: ComponentFixture<PaginaInicialParolantoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaInicialParolantoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaInicialParolantoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
