import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResourceForm } from './resource-form';

describe('ResourceForm', () => {
  let component: ResourceForm;
  let fixture: ComponentFixture<ResourceForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResourceForm],
    }).compileComponents();

    fixture = TestBed.createComponent(ResourceForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
