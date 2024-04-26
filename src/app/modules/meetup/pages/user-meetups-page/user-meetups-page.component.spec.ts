import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMeetupsPageComponent } from './user-meetups-page.component';

describe('UserMeetupsPageComponent', () => {
  let component: UserMeetupsPageComponent;
  let fixture: ComponentFixture<UserMeetupsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserMeetupsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserMeetupsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
