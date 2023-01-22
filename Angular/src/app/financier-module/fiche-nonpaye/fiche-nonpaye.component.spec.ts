import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheNonpayeComponent } from './fiche-nonpaye.component';

describe('FicheNonpayeComponent', () => {
  let component: FicheNonpayeComponent;
  let fixture: ComponentFixture<FicheNonpayeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FicheNonpayeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FicheNonpayeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
