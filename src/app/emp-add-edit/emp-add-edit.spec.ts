import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpAddEdit } from './emp-add-edit';

describe('EmpAddEdit', () => {
  let component: EmpAddEdit;
  let fixture: ComponentFixture<EmpAddEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmpAddEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpAddEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
