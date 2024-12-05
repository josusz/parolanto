import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciarExemplosComponent } from './gerenciar-exemplos.component';

describe('GerenciarExemplosComponent', () => {
  let component: GerenciarExemplosComponent;
  let fixture: ComponentFixture<GerenciarExemplosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GerenciarExemplosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GerenciarExemplosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
