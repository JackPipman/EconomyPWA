import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { BaseApi } from '../../../shared/core/base-api';
import { Category } from '../models/category.model';

@Injectable()
export class CategoriesService extends BaseApi {
	
	constructor(public http: Http) {
		super(http);
	}

	addCategory(category: Category): Observable<Category>{
		return this.post('categories', category);
	}

	getCategories(): Observable<Category[]> {
		return this.get('categories');
	}

	updateCategory(category: Category): Observable<Category> {
		return this.put(`categories/${category.id}`, category);
	}

	getCategoriesById(id: number): Observable<Category> {
		return this.get(`categories/${id}`);
	}
}