import { TestBed } from '@angular/core/testing';

import { FoodItemResolver } from './food-item.resolver';

describe('FoodItemResolver', () => {
  let resolver: FoodItemResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(FoodItemResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
