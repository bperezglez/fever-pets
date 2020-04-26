import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { PetsService } from '../services/pets.service';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from 'src/app/shared/loading/loading.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  pet: any;
  constructor(private location: Location, private petsService: PetsService, private route: ActivatedRoute,private loadingService: LoadingService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.loadingService.show();
    this.petsService.getPetById({id}).subscribe(petDetail => {
      this.pet = petDetail;
      this.loadingService.hide();
    });
  }

  getBack() {
    this.location.back();
  }

}
