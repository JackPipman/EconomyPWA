import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { CategoriesService } from '../../shared/services/categoies.service';
import { Category } from '../../shared/models/category.model';

@Component({
  selector: 'my-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit, OnDestroy {

  @Output() onCategoryAdd = new EventEmitter<Category>();

  constructor(private categoriesServise: CategoriesService) { }

  sub1: Subscription;

  ngOnInit() {
  }

  ngOnDestroy() {
    if(this.sub1) this.sub1.unsubscribe();
  }

  onSubmit(form: NgForm) {
  	let {name, capacity} = form.value;
  	if (capacity <=0) {
  		capacity *= -1;
  	}

  	const category = new Category(name, capacity);

  	this.sub1 = this.categoriesServise.addCategory(category)
  	.subscribe((category: Category) => {
  		console.log(category);
  		form.reset();
  		form.form.patchValue({capacity: 1});
  		this.onCategoryAdd.emit(category);
  	})
  }

}
