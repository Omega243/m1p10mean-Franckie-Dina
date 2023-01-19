import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancierMenuComponent } from './financier-menu.component';

describe('FinancierMenuComponent', () => {
  let component: FinancierMenuComponent;
  let fixture: ComponentFixture<FinancierMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinancierMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinancierMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
