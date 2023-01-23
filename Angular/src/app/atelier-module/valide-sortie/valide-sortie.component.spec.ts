import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValideSortieComponent } from './valide-sortie.component';

describe('ValideSortieComponent', () => {
  let component: ValideSortieComponent;
  let fixture: ComponentFixture<ValideSortieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValideSortieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValideSortieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
