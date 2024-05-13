import { TestBed } from '@angular/core/testing';

import { MealOptionResolver } from './meal-option.resolver';

describe('MealOptionResolver', () => {
  let resolver: MealOptionResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(MealOptionResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
