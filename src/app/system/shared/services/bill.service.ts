import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Bill } from '../models/bill.model';
import { map } from 'rxjs/operators';
import { BaseApi } from '../../../shared/core/base-api';

@Injectable()
export class BillService extends BaseApi {
	constructor(public http: Http) {
		super(http);
	}

	updateBill(bill: Bill): Observable<Bill> {
		return this.put('bill', bill)
	}

	getBill():Observable<Bill>{
		return this.get('bill');
	}

	getCurrency(base: string = 'RUB'):Observable<any>{
		return this.http.get(`https://api.exchangeratesapi.io/latest?symbols=USD,EUR&base=${base}`)
		.map((res: Response) => res.json());
	}
}