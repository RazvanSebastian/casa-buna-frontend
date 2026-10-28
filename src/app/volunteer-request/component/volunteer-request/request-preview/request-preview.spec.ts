import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RequestPreview } from './request-preview';

describe('RequestPreview', () => {
  let component: RequestPreview;
  let fixture: ComponentFixture<RequestPreview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestPreview],
    }).compileComponents();

    fixture = TestBed.createComponent(RequestPreview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
