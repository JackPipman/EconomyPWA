import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Category } from '../../shared/models/category.model';

@Component({
  selector: 'my-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.scss']
})
export class HistoryFilterComponent implements OnInit {

  constructor() { }

  @Output() onFilterCancel = new EventEmitter<any>();
  @Output() onFilterApply = new EventEmitter<any>();

  @Input() categories: Category[] = [];

  timePeriods = [
  	{type: 'd', label: 'День'},
  	{type: 'w', label: 'Неделя'},
  	{type: 'M', label: 'Месяц'}
  ]

  selectedPeriod = 'd';

  types = [
  	{type: 'income', label: 'Доход'},
  	{type: 'outcome', label: 'Расход'}
  ];

  selectedTypes = [];
  selectedCategories = [];

  ngOnInit() {
  }

  closeFilter() {
  	this.selectedTypes = [];
  	this.selectedCategories = [];
  	this.selectedPeriod = 'd';
  	this.onFilterCancel.emit();
  }

  applyFilter() {
  	this.onFilterApply.emit({
  		types: this.selectedTypes,
  		categories: this.selectedCategories,
  		period: this.selectedPeriod
  	})
  }

  private calculateInputParams(field: string, checked: boolean, value: string) {
  	if(checked) {
  		this[field].indexOf(value) === -1 ? this[field].push(value) : null;
  	} else {
  		this[field] = this[field].filter(i => i !== value);
  	}
  }

  typeChange({checked, value}) {
  	this.calculateInputParams('selectedTypes', checked, value);
  }

  categoryChange({checked, value}) {
	this.calculateInputParams('selectedCategories', checked, value);
  }

}
