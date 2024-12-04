import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciarVocabulosComponent } from './gerenciar-vocabulos.component';

describe('GerenciarVocabulosComponent', () => {
  let component: GerenciarVocabulosComponent;
  let fixture: ComponentFixture<GerenciarVocabulosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GerenciarVocabulosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GerenciarVocabulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
