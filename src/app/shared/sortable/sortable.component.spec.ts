import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SortableComponent } from './sortable.component';

describe('SortableComponent', () => {
  let component: SortableComponent;
  let fixture: ComponentFixture<SortableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SortableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onSort desc', () => {
    const spy = spyOn(component.sorted, 'emit');
    component.order = 'desc';
    component.name = 'name';
    component.onSort();
    expect(spy).toHaveBeenCalledWith({order: 'asc', name: 'name'});
  });
  it('onSort asc', () => {
    const spy = spyOn(component.sorted, 'emit');
    component.order = 'asc';
    component.name = 'name';
    component.onSort();
    expect(spy).toHaveBeenCalledWith({order: 'desc', name: 'name'});
  });
});
