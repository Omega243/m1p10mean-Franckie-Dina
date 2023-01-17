import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CFactureComponent } from './c-facture.component';

describe('CFactureComponent', () => {
  let component: CFactureComponent;
  let fixture: ComponentFixture<CFactureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CFactureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CFactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
