import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoadingService } from './loading.service';

@Component({
  selector: 'fever-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit, OnDestroy {
  show: Boolean = false;
  loadingSubscription: any;
  constructor(private loadingService: LoadingService) { }

  ngOnInit(): void {
    this.loadingSubscription = this.loadingService.loadingState
      .subscribe((state) => {
        this.show = state.show;
      });
  }

  ngOnDestroy() {
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
  }
}
