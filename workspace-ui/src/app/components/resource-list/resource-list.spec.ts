import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResourceList } from './resource-list';

describe('ResourceList', () => {
  let component: ResourceList;
  let fixture: ComponentFixture<ResourceList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResourceList],
    }).compileComponents();

    fixture = TestBed.createComponent(ResourceList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
