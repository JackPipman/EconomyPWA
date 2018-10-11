import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { EventsService } from '../../shared/services/events.service';
import { CategoriesService } from '../../shared/services/categoies.service';
import { CasheEvent } from '../../shared/models/event.model';
import { Category } from '../../shared/models/category.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'my-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.scss']
})
export class HistoryDetailComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute, 
  			  private eventsService: EventsService,
  			  private categoriesServise: CategoriesService) { }

  event: CasheEvent;
  category: Category;

  isLoaded = false;

  s1: Subscription;

  ngOnInit() {
  	this.s1 = this.route.params
  	.mergeMap((params: Params) => this.eventsService.getEventsById(params['id']))
  	.mergeMap((event: CasheEvent) => {
  		this.event = event;
  		return this.categoriesServise.getCategoriesById(event.category);
  	})
  	.subscribe((category: Category) => {
  		this.category = category;
  		this.isLoaded = true;
  	})
  }

  ngOnDestroy() {
  	if (this.s1) {
  		this.s1.unsubscribe();
  	}
  }

}
