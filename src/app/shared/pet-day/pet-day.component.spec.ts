import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PetDayComponent } from './pet-day.component';
import { Router } from '@angular/router';

describe('PetDayComponent', () => {
  let component: PetDayComponent;
  let fixture: ComponentFixture<PetDayComponent>;
  let router = {
    navigate: jasmine.createSpy('navigate')
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ PetDayComponent ],
      providers: [
        {
          provide: Router, useValue: router,
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getPetOfTheDay day 10', () => {
    spyOn(Date.prototype, 'getDate').and.returnValue(10);
    component.getPetOfTheDay();
    expect(router.navigate).toHaveBeenCalledWith(['/pet', 10]);
  });
  it('getPetOfTheDay day 31', () => {
    spyOn(Date.prototype, 'getDate').and.returnValue(31);
    component.getPetOfTheDay();
    expect(router.navigate).toHaveBeenCalledWith(['/pet', 30]);
  });
});
