import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pickup-call-card',
  templateUrl: './pickup-call-card.component.html',
  styleUrls: ['./pickup-call-card.component.scss'],
})
export class PickupCallCardComponent  implements OnInit {
  hasHeader: boolean = true;
  hasFooter: boolean = false;
  constructor() {

   }

  ngOnInit() {}

}
