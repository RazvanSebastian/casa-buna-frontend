import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RequestTableFilters } from './request-table-filters';

describe('RequestTableFilters', () => {
  let component: RequestTableFilters;
  let fixture: ComponentFixture<RequestTableFilters>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestTableFilters],
    }).compileComponents();

    fixture = TestBed.createComponent(RequestTableFilters);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
