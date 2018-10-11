import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { BillService } from '../shared/services/bill.service';
import { CategoriesService } from '../shared/services/categoies.service';
import { EventsService } from '../shared/services/events.service';
import { Bill } from '../shared/models/bill.model';
import { Category } from '../shared/models/category.model';
import { CasheEvent } from '../shared/models/event.model';


@Component({
  selector: 'my-planning-page',
  templateUrl: './planning-page.component.html',
  styleUrls: ['./planning-page.component.scss']
})
export class PlanningPageComponent implements OnInit, OnDestroy {

	sub1: Subscription;

  isLoaded = false;
  bill: Bill;
  categories: Category[];
  casheEvents: CasheEvent[];

  constructor(private billService: BillService,
  		  	  	private categoriesService: CategoriesService,
  		  	  	private eventsService: EventsService
  ) { }

  ngOnInit() {
  	this.sub1 = Observable.combineLatest(
  	  this.billService.getBill(),
      this.categoriesService.getCategories(),
  	  this.eventsService.getEvents()
  	).subscribe((data: [Bill, Category[], CasheEvent[]]) => {
  		this.bill = data[0];
  		this.categories = data[1];
  		this.casheEvents = data[2];

  		this.isLoaded = true;
  	});
  }

  ngOnDestroy() {
  	if(this.sub1) this.sub1.unsubscribe();
  }

  getCategoryCost(category: Category): number {
  	const catEvents = this.casheEvents.filter(e => e.category === category.id && e.type ==='outcome');
  	return catEvents.reduce((total, e) => {
  		total += e.amount;
  		return total;
  	}, 0);
  }

  private getPercent(category: Category): number {
  	const percent = (100 * this.getCategoryCost(category))/category.capacity;
  	return percent > 100 ? 100 : percent;
  }

  getCatWidth(category: Category): string {
  	return this.getPercent(category) + '%';
  }

  getCatColorClass(category: Category): string {
  	const percent = this.getPercent(category);
  	return percent < 60 ? 'success' : percent >= 100 ? 'danger' : 'warning';
}
}
