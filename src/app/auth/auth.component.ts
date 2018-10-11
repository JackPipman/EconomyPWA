import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { fadeStateTrigger } from '../shared/animations/fade.animation';

@Component({
	selector: 'my-auth',
	templateUrl: './auth.component.html',
	animations: [fadeStateTrigger]
})
export class AuthComponent implements OnInit {

	@HostBinding('@fade') a = true;

	constructor(private router: Router) {}

	ngOnInit() {
		if (this.router.url != '/registration') this.router.navigate(['/login']);
	}


}