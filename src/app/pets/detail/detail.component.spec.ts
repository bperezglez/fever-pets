import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ActivatedRoute } from '@angular/router';

import { DetailComponent } from './detail.component';

import { PetsService } from './../services/pets.service';

import ActivatedRouteMock from './../../../mocks/ActivatedRouteMock'

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  let petsServiceSpy: jasmine.SpyObj<PetsService>;

  const routeSpy = jasmine.createSpy('ActivatedRoute');

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
      ],
    })
    .compileComponents();
    petsServiceSpy = TestBed.get(PetsService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
