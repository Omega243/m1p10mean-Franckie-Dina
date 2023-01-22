import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepenseSaveComponent } from './depense-save.component';

describe('DepenseSaveComponent', () => {
  let component: DepenseSaveComponent;
  let fixture: ComponentFixture<DepenseSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepenseSaveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepenseSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
