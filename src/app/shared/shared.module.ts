import { NgModule } from '@angular/core';
import { PickupCallCardComponent } from '../components/pickup-call-card/pickup-call-card.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ErrorMessageComponent } from '../components/error-message/error-message.component';

@NgModule({
  declarations: [PickupCallCardComponent, ErrorMessageComponent],
  exports: [PickupCallCardComponent, ErrorMessageComponent],
  imports: [IonicModule,CommonModule ]
})
export class SharedModule {}

