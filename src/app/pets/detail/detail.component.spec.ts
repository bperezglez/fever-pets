import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ActivatedRoute, Router } from '@angular/router';

import { DetailComponent } from './detail.component';

import { PetsService } from './../services/pets.service';

import ActivatedRouteMock from './../../../mocks/ActivatedRouteMock'
import PetsServiceMock from 'src/mocks/PetsServiceMock';
import { LoadingService } from 'src/app/shared/loading/loading.service';
import { Location } from '@angular/common';

let router = {
  navigate: jasmine.createSpy('navigate')
}

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  let petsServiceSpy: jasmine.SpyObj<PetsService>;
  let loadingService: LoadingService;
  let location: Location;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailComponent ],
      imports: [
         HttpClientTestingModule,
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
    loadingService = TestBed.get(LoadingService);
    location = TestBed.get(Location);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getBack location back been called', () => {
    const spy = spyOn(location, 'back');
    component.getBack();
    expect(spy).toHaveBeenCalled();
  });
});
