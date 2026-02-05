import { TestBed } from '@angular/core/testing';

import { Articulo } from './articulo';

describe('Articulo', () => {
  let service: Articulo;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Articulo);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
