import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { PetsService } from '../services/pets.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  pet: any;
  constructor(private location: Location, private petsService: PetsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.petsService.getPetById({id}).subscribe(petDetail => {
      this.pet = petDetail;
    })
    console.log(id)
  }

  getBack() {
    this.location.back();
  }

}
