import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CFileComponent } from './c-file.component';

describe('CFileComponent', () => {
  let component: CFileComponent;
  let fixture: ComponentFixture<CFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CFileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
