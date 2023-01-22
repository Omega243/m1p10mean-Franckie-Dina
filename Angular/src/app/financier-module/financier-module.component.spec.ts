import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancierModuleComponent } from './financier-module.component';

describe('FinancierModuleComponent', () => {
  let component: FinancierModuleComponent;
  let fixture: ComponentFixture<FinancierModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinancierModuleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinancierModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
