import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CheckinProductNewPage } from './checkin-product-new';

@NgModule({
  declarations: [
    CheckinProductNewPage,
  ],
  imports: [
    IonicPageModule.forChild(CheckinProductNewPage),
  ],
})
export class CheckinProductNewPageModule {}
