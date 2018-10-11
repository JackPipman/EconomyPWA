import { Component, OnInit } from '@angular/core';
import { Category } from '../shared/models/category.model';
import { CategoriesService } from '../shared/services/categoies.service';

@Component({
  selector: 'my-records-page',
  templateUrl: './records-page.component.html',
  styleUrls: ['./records-page.component.scss']
})
export class RecordsPageComponent implements OnInit {

  constructor(private categoriesServise: CategoriesService) { }

  categories: Category[] = [];
  isLoaded = false;

  ngOnInit() {
  	this.categoriesServise.getCategories()
  	.subscribe((categories: Category[]) => {
  		this.categories = categories;
  		this.isLoaded = true;
  	})
  }

  newCategoryAdded(category: Category) {
  	this.categories.push(category);
  }

  categoryEdited(category: Category) {
    const idx = this.categories.findIndex(
      c => c.id === category.id);
    this.categories[idx] = category;
  }

}
