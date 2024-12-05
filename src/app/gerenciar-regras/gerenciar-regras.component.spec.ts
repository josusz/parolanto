import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciarRegrasComponent } from './gerenciar-regras.component';

describe('GerenciarRegrasComponent', () => {
  let component: GerenciarRegrasComponent;
  let fixture: ComponentFixture<GerenciarRegrasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GerenciarRegrasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GerenciarRegrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
