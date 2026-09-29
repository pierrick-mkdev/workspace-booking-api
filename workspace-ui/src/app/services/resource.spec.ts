import { TestBed } from '@angular/core/testing';
import { Resource } from './resource';

describe('Resource', () => {
  let service: Resource;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Resource);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
