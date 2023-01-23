import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiffreMensuelComponent } from './chiffre-mensuel.component';

describe('ChiffreMensuelComponent', () => {
  let component: ChiffreMensuelComponent;
  let fixture: ComponentFixture<ChiffreMensuelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChiffreMensuelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChiffreMensuelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
