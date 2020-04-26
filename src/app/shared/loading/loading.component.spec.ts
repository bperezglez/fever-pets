import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingComponent } from './loading.component';
import { Observable } from 'rxjs';
import { LoadingService } from './loading.service';

class LoadingServiceMock {
  constructor() {}
  get loadingState() {
    return new Observable(observer => {
      observer.complete();
    });
  }
}

describe('LoadingComponent', () => {
  let component: LoadingComponent;
  let fixture: ComponentFixture<LoadingComponent>;
  let service: LoadingService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingComponent ],
    })
    .compileComponents();
    service = TestBed.get(LoadingService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loadingservice show', () => {
    service.loadingState.subscribe((data) => {
      expect(data.show).toBeTruthy();
    });
    service.show();
  });
  it('loadingservice hide loadingSubscription = null', () => {
    component.loadingSubscription = null;
    service.loadingState.subscribe((data) => {
      expect(data.show).toBeFalsy();
    });
    service.hide();
  });
});
