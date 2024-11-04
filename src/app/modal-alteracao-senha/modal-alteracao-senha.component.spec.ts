import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAlteracaoSenhaComponent } from './modal-alteracao-senha.component';

describe('ModalAlteracaoSenhaComponent', () => {
  let component: ModalAlteracaoSenhaComponent;
  let fixture: ComponentFixture<ModalAlteracaoSenhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAlteracaoSenhaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAlteracaoSenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
