import { TestBed } from '@angular/core/testing';

import { MealResolver } from './meal.resolver';

describe('MealResolver', () => {
  let resolver: MealResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(MealResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
