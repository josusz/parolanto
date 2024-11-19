import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciarDefinicoesComponent } from './gerenciar-definicoes.component';

describe('GerenciarDefinicoesComponent', () => {
  let component: GerenciarDefinicoesComponent;
  let fixture: ComponentFixture<GerenciarDefinicoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GerenciarDefinicoesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GerenciarDefinicoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
