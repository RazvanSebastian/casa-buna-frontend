import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogSetRolesComponent } from './dialog-set-roles';

describe('DialogSetRoles', () => {
  let component: DialogSetRolesComponent;
  let fixture: ComponentFixture<DialogSetRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogSetRolesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogSetRolesComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
