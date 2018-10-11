import { Component, HostBinding } from '@angular/core';
import { fadeStateTrigger } from '../shared/animations/fade.animation';
@Component({
	selector: 'my-system',
	templateUrl: './system.component.html',
	animations: [fadeStateTrigger]
})
export class SystemComponent {

	isMenuOpened = false;

	@HostBinding('@fade') a = true;

	openMenu(e) {
		this.isMenuOpened = e;
		console.log(this.isMenuOpened);
	}

	closeMenu(e) {
		this.isMenuOpened = e;
		console.log(this.isMenuOpened);
	}
}