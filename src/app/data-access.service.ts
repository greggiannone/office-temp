import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Reading } from './models/reading';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/empty';
import { Observable } from 'rxjs/Observable';

const httpOptions = 
{
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class DataAccessService {

	private dbUrl = 'http://ONE-022661:3000'

	constructor(private http: HttpClient) { }

	addReading(reading: Reading)
	{
		const url = `${this.dbUrl}/readings`
		return this.http.post<Reading>(url, reading, httpOptions).catch((err: HttpErrorResponse) =>
		{
			console.log(err);
			return Observable.empty<Reading>();
		});
	}

	login(id: string, password: string)
	{
		const url = `${this.dbUrl}/login`;
		return this.http.post<any>(url, { id, password }).do(res => this.setSession(res)).catch((err: HttpErrorResponse) =>
		{
			console.log(err);
			return Observable.empty<any>();
		});
	}

	getCurrentReading()
	{
		const url = `${this.dbUrl}/readings/current`
		return this.http.get<Reading>(url, httpOptions).catch((err: HttpErrorResponse) =>
		{
			console.log(err);
			return Observable.empty<Reading>();
		});
	}

	private setSession(authResult) 
	{
		localStorage.setItem('id_token', authResult.token);
    }
}
