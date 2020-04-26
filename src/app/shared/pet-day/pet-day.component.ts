import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'fever-pet-day',
  templateUrl: './pet-day.component.html',
  styleUrls: ['./pet-day.component.scss']
})
export class PetDayComponent {

  constructor(private router: Router) { }

  getPetOfTheDay() {
    const petDay =  new Date().getDate();
    this.router.navigate(['/pet', petDay === 31 ? 30 : petDay]);
  }
}
