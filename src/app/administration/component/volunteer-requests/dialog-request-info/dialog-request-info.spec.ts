import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogRequestInfo } from './dialog-request-info';

describe('DialogRequestInfo', () => {
  let component: DialogRequestInfo;
  let fixture: ComponentFixture<DialogRequestInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogRequestInfo],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogRequestInfo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
