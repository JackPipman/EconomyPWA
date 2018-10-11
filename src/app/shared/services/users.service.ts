import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {User} from '../models/user.model';
import { map } from 'rxjs/operators';
import { BaseApi } from '../../shared/core/base-api';

@Injectable()
export class UsersService extends BaseApi {
	constructor(public http: Http) {
		super(http);
	}

	//getUserByEmail(email: string): Observable<User> {
	//	return this.http.get(`http://localhost:3000/users?email=${email}`)
	//	.map((response: Response) => response.json())
	//	.map((user: User[]) => user[0]);
	//}

	getUserByEmail(email: string): Observable<User> {
		return this.get(`users/${email}`)//users?email=${email}
				.map((user: User[]) => user[0]);
	}

	// createNewUser(user: User): Observable<User> {
	// 	return this.http.post(`http://localhost:3000/users`, user)
	// 	.map((res: Response) => res.json());
	// }

	createNewUser(user: User): Observable<User> {
		return this.post('users', user);
	}
}