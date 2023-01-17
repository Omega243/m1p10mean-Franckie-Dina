import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CHistoriqueComponent } from './c-historique.component';

describe('CHistoriqueComponent', () => {
  let component: CHistoriqueComponent;
  let fixture: ComponentFixture<CHistoriqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CHistoriqueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CHistoriqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
