import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarInterativoComponent } from './navbar-interativo.component';

describe('NavbarInterativoComponent', () => {
  let component: NavbarInterativoComponent;
  let fixture: ComponentFixture<NavbarInterativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarInterativoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarInterativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
