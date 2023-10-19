import { NgModule } from '@angular/core';
import { PickupCallCardComponent } from '../components/pickup-call-card/pickup-call-card.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [PickupCallCardComponent],
  exports: [PickupCallCardComponent],
  imports: [IonicModule]
})
export class SharedModule {}

