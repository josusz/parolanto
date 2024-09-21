import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterarSenhaUsuarioConfirmacaoComponent } from './alterar-senha-usuario-confirmacao.component';

describe('AlterarSenhaUsuarioConfirmacaoComponent', () => {
  let component: AlterarSenhaUsuarioConfirmacaoComponent;
  let fixture: ComponentFixture<AlterarSenhaUsuarioConfirmacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlterarSenhaUsuarioConfirmacaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlterarSenhaUsuarioConfirmacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
