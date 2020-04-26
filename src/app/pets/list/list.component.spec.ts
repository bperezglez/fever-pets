import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ActivatedRoute, Router } from '@angular/router';

import { ListComponent } from './list.component';
import { PetsService } from './../services/pets.service';

import ActivatedRouteMock from './../../../mocks/ActivatedRouteMock'
import PetsServiceMock from './../../../mocks/PetsServiceMock'


let router = {
  navigate: jasmine.createSpy('navigate')
}

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let petsServiceSpy: jasmine.SpyObj<PetsService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useClass: ActivatedRouteMock,
        },
        {
          provide: PetsService,
          useClass: PetsServiceMock,
        },
        {
          provide: Router, useValue: router,
        }
      ],
    })
    .compileComponents();
    petsServiceSpy = TestBed.get(PetsService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('handleResponse been called', () => {
    const spy = spyOn(component, 'handleResponse');
    component.getPets();
    expect(spy).toHaveBeenCalled();
  });
  it('handleSortedEvent', () => {
    component.handleSortedEvent({order: 'asc', name: 'name'});
    expect(router.navigate).toHaveBeenCalled();
  });
  it('handlePaginatedEvent', () => {
    component.handlePaginatedEvent({link: '?_page=2&'});
    expect(router.navigate).toHaveBeenCalled();
  });
  it('goToPetDetail', () => {
    component.goToPetDetail(1);
    expect(router.navigate).toHaveBeenCalledWith(['/pet', 1]);
  });
});
