import { TestBed } from '@angular/core/testing';

import { FoodItemEntryResolver } from './food-item-entry.resolver';

describe('FoodItemEntryResolver', () => {
  let resolver: FoodItemEntryResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(FoodItemEntryResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
