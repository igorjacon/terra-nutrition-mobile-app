import { TestBed } from '@angular/core/testing';

import { MealPlanResolver } from './meal-plan.resolver';

describe('MealPlanResolver', () => {
  let resolver: MealPlanResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(MealPlanResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
