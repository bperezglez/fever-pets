import { Component, OnInit } from '@angular/core';
import { PetsService } from '../services/pets.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  tableHeaders: any;
  pets: Array<any>;
  pagination: Object;
  by: String;
  order: String;

  constructor(
    private petsService: PetsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.tableHeaders = this.petsService.getDefaultTableHeaders();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.by = params.by;
      this.order = params.order;
      this.getPets();
    });
  }
  getPets(options: any = this.route.snapshot.queryParams) {
    this.petsService
      .getPetsList(options)
      .subscribe(this.handleResponse.bind(this));
  }
  handleSortedEvent(event) {
    const { queryParams } = this.route.snapshot;
    const order = event.order;
    const by = event.name;

    this.router.navigate(['/'], { queryParams: { ...queryParams, order, by } });
  }
  handlePaginatedEvent(event) {
    const page = event.link.replace(/.*_page=(.*)?\&.*/, '$1');
    const { queryParams } = this.route.snapshot;

    this.router.navigate(['/'], { queryParams: { ...queryParams, page } });
  }
  handleResponse(res) {
    const { response, linkHeader } = res;
    this.pets = response;
    this.pagination = linkHeader;
  }

  goToPetDetail(id) {
    this.router.navigate(['/pet', id]);
  }
}
