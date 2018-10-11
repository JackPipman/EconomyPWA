import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';

import { CasheEvent } from '../models/event.model';
import { BaseApi } from '../../../shared/core/base-api';

@Injectable()
export class EventsService extends BaseApi {
	
	constructor(http: Http) {
		super(http);
	}

	addEvent(event: CasheEvent): Observable<CasheEvent> {
		return this.post('events', event);
	}

	getEvents(): Observable<CasheEvent[]> {
		return this.get('events');
	}

	getEventsById(id: string): Observable<CasheEvent> {
		return this.get(`events/${id}`);
	}
}