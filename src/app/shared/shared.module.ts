import { NgModule } from '@angular/core';
import { PickupCallCardComponent } from '../components/pickup-call-card/pickup-call-card.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [PickupCallCardComponent],
  exports: [PickupCallCardComponent],
  imports: [IonicModule,CommonModule]
})
export class SharedModule {}

