import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComentariosProjetoComponent } from './comentarios-projeto.component';

describe('ComentariosProjetoComponent', () => {
  let component: ComentariosProjetoComponent;
  let fixture: ComponentFixture<ComentariosProjetoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComentariosProjetoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComentariosProjetoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
