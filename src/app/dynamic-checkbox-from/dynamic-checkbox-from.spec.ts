import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicCheckboxFrom } from './dynamic-checkbox-from';

describe('DynamicCheckboxFrom', () => {
  let component: DynamicCheckboxFrom;
  let fixture: ComponentFixture<DynamicCheckboxFrom>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DynamicCheckboxFrom]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicCheckboxFrom);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
