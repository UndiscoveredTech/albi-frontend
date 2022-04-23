import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAssociateComponent } from './user-associate.component';

describe('UserAssociateComponent', () => {
  let component: UserAssociateComponent;
  let fixture: ComponentFixture<UserAssociateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAssociateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAssociateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});