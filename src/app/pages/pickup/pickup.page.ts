import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pickup',
  templateUrl: './pickup.page.html',
  styleUrls: ['./pickup.page.scss'],
})
export class PickupPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  newPickUpCall(){
    this.router.navigate(['home'])
  }

}
