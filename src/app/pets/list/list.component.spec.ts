import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ActivatedRoute } from '@angular/router';

import { ListComponent } from './list.component';
import { PetsService } from './../services/pets.service';

import ActivatedRouteMock from './../../../mocks/ActivatedRouteMock'
import { Observable } from 'rxjs';

class PetsServiceMock {
  constructor() {}
  getPetsList() {
    console.log(888);
    return new Observable((observer) => {
      observer.next({response: [{}], linkHeader: {}});
      observer.complete();
    })
  }
  getDefaultTableHeaders() {
    return [
      {
        name: 'photo_url',
        title: 'Imagen',
        sortable: false,
        order: null,
      },
    ];
  }
}

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let petsServiceSpy: jasmine.SpyObj<PetsService>;

  const routeSpy = jasmine.createSpy('ActivatedRoute');

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
  })
});
