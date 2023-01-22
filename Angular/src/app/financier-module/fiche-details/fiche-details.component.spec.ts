import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheDetailsComponent } from './fiche-details.component';

describe('FicheDetailsComponent', () => {
  let component: FicheDetailsComponent;
  let fixture: ComponentFixture<FicheDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FicheDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FicheDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
