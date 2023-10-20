import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  gotoPickupCalls(){
    this.router.navigate(['pickup-calls'])
  }
  newPickUpCall(){
    console.log('are we here')
    this.router.navigate(['pickup'])
  }

  
}
