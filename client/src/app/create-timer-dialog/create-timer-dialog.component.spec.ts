import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTimerDialogComponent } from './create-timer-dialog.component';

describe('CreateTimerDialogComponent', () => {
  let component: CreateTimerDialogComponent;
  let fixture: ComponentFixture<CreateTimerDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTimerDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTimerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
