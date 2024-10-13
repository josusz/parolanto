import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaConlangComponent } from './lista-conlang.component';

describe('ListaConlangComponent', () => {
  let component: ListaConlangComponent;
  let fixture: ComponentFixture<ListaConlangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaConlangComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaConlangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
