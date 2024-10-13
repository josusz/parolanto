import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcessarProjetoComponent } from './acessar-projeto.component';

describe('AcessarProjetoComponent', () => {
  let component: AcessarProjetoComponent;
  let fixture: ComponentFixture<AcessarProjetoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcessarProjetoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcessarProjetoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
