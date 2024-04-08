import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IntakeFormPage } from './intake-form.page';

describe('IntakeFormPage', () => {
  let component: IntakeFormPage;
  let fixture: ComponentFixture<IntakeFormPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(IntakeFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
