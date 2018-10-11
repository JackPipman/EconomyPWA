import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import * as moment from 'moment';

import { CategoriesService } from '../shared/services/categoies.service';
import { EventsService } from '../shared/services/events.service';
import { Category } from '../shared/models/category.model';
import { CasheEvent } from '../shared/models/event.model';

@Component({
  selector: 'my-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy {

  constructor(private categoriesService: CategoriesService,
  			  private eventsService: EventsService) { }

  sub1: Subscription;

  isLoaded = false;

  categories: Category[] = [];
  events: CasheEvent[] = [];
  filteredEvents: CasheEvent[] = [];  

  chartData = [];

  isFilterVisible = false;

  ngOnInit() {
  	this.sub1 = Observable.combineLatest(
  		this.categoriesService.getCategories(),
  		this.eventsService.getEvents()
  	).subscribe((data: [Category[], CasheEvent[]]) => {
  		this.categories = data[0];
  		this.events = data[1];

      this.setOrigEvents();

  		this.calculateChart();

  		this.isLoaded = true;
  	});
  }

  ngOnDestroy() {
  	if (this.sub1) this.sub1.unsubscribe();
  }

  private setOrigEvents() {
    this.filteredEvents = this.events.slice();
  }

  calculateChart(): void {
  	this.chartData = [];

  	this.categories.forEach((category: Category) => {
  		const catEvents = this.filteredEvents.filter(e => e.category === category.id && e.type ==='outcome');
  		this.chartData.push({
  			name: category.name,
  			value: catEvents.reduce((total, e) => {
  					total += e.amount;
  					return total;
  			}, 0)
  		})
  	})
  }

  private toggleVisibility(dir: boolean) {
    this.isFilterVisible = dir;
  }

  openFilter() {
    this.toggleVisibility(true);
  }

  onFilterCancel() {
    this.toggleVisibility(false);
    this.setOrigEvents();
    this.calculateChart();
  }

  onFilterApply(filterData) {
    this.toggleVisibility(false);
    this.setOrigEvents();

    const startPeriod = moment().startOf(filterData.period).startOf('d');
    const endPeriod = moment().endOf(filterData.period).endOf('d');
    console.log(filterData);

    this.filteredEvents = this.filteredEvents
    .filter((e) => {
      return filterData.types.indexOf(e.type) !== -1;
    })
    .filter((e) => {
      return filterData.categories.indexOf(e.category.toString()) !== -1;
    })
    .filter((e) => {
      const momentDate = moment(e.date, 'DD.MM.YYYY HH:mm:ss');
      return momentDate.isBetween(startPeriod, endPeriod);
    });

    this.calculateChart();
  }

}
