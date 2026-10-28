import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VolunteerRequest } from './volunteer-request';

describe('VolunteerRequest', () => {
  let component: VolunteerRequest;
  let fixture: ComponentFixture<VolunteerRequest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VolunteerRequest],
    }).compileComponents();

    fixture = TestBed.createComponent(VolunteerRequest);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
