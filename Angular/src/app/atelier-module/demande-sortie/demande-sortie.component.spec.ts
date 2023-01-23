import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeSortieComponent } from './demande-sortie.component';

describe('DemandeSortieComponent', () => {
  let component: DemandeSortieComponent;
  let fixture: ComponentFixture<DemandeSortieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandeSortieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemandeSortieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
