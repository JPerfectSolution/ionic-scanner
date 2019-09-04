import { 
	NgModule, 
	CUSTOM_ELEMENTS_SCHEMA
	} from '@angular/core';
import { CoreToolbarComponent } from './core-toolbar/core-toolbar';
import {IonicModule} from 'ionic-angular';

@NgModule({
	declarations: [CoreToolbarComponent],
	imports: [IonicModule],
	exports: [CoreToolbarComponent],
	schemas : [
		CUSTOM_ELEMENTS_SCHEMA
	]
})
export class ComponentsModule {}
