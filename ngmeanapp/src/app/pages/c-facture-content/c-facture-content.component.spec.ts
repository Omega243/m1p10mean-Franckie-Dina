import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CFactureContentComponent } from './c-facture-content.component';

describe('CFactureContentComponent', () => {
  let component: CFactureContentComponent;
  let fixture: ComponentFixture<CFactureContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CFactureContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CFactureContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
