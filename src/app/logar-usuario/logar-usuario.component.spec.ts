import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogarUsuarioComponent } from './logar-usuario.component';

describe('LogarUsuarioComponent', () => {
  let component: LogarUsuarioComponent;
  let fixture: ComponentFixture<LogarUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogarUsuarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
