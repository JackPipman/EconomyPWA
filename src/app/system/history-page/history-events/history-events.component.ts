import { Component, OnInit, Input } from '@angular/core';

import { Category } from '../../shared/models/category.model';
import { CasheEvent } from '../../shared/models/event.model';

@Component({
  selector: 'my-history-events',
  templateUrl: './history-events.component.html',
  styleUrls: ['./history-events.component.scss']
})
export class HistoryEventsComponent implements OnInit {

  constructor() { }

  @Input() categories: Category[] = [];
  @Input() events: CasheEvent[] = [];

  searchValue = '';
  searchPlaceHolder = 'Сумма';
  searchField = 'amount';

  ngOnInit() {
  	this.events.forEach((e) => {
  		e.catName = this.categories.find(c => c.id === e.category).name;
  	});
  }

  getEventClass(e: CasheEvent) {
  	return {
  		'label': true,
  		'label-danger': e.type === 'outcome',
  		'label-success': e.type === 'income',
  	}
  }

  changeCriteria(field: string) {
  	const namesMap = {
  		amount: 'Сумма',
  		date: 'Дата',
  		category: 'Категория',
  		type: 'Тип'
  	}

  	this.searchPlaceHolder = namesMap[field];
  	this.searchField = field;
  }

}
