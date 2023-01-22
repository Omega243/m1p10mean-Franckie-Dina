import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepenseHistoriqueComponent } from './depense-historique.component';

describe('DepenseHistoriqueComponent', () => {
  let component: DepenseHistoriqueComponent;
  let fixture: ComponentFixture<DepenseHistoriqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepenseHistoriqueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepenseHistoriqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
