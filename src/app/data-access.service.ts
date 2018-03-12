import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Reading } from './models/reading';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';

const httpOptions = 
{
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class DataAccessService {

	private dbUrl = 'http://ONE-022661:3000'

	constructor(private http: HttpClient)
	{ 
	}

	addReading(reading: Reading): Observable<any>
	{
		const url = `${this.dbUrl}/readings`
		return this.http.post<Reading>(url, reading, httpOptions).catch((err: HttpErrorResponse) =>
		{
			console.log(err);
			return Observable.of<any>({ error: "Reading could not be submitted" });
		});
	}

	login(id: string, password: string): Observable<any>
	{
		const url = `${this.dbUrl}/login`;
		return this.http.post<any>(url, { id, password }).do(res => this.setSession(res)).catch((err: HttpErrorResponse) =>
		{
			console.log(err);
			return Observable.of<any>({ auth: false });
		});
	}

	getCurrentReading(): Observable<Reading>
	{
		const url = `${this.dbUrl}/readings/current`
		return this.http.get<Reading>(url, httpOptions).catch((err: HttpErrorResponse) =>
		{
			console.log(err);
			return Observable.empty<Reading>();
		});
	}

	isLoggedIn(): Observable<any>
	{
		const url = `${this.dbUrl}/pingLogin`
		return this.http.get<any>(url, httpOptions).do(res => this.checkAuth(res)).catch((err: HttpErrorResponse) =>
		{
			console.log(err);
			return Observable.of<any>({ auth: false });
		});
	}

	getTodaysReadings(): Observable<Reading[]>
	{
		const url = `${this.dbUrl}/readings/today`
		return this.http.get<Reading[]>(url, httpOptions).catch((err: HttpErrorResponse) =>
		{
			console.log(err);
			return Observable.empty<Reading[]>();
		});
	}

	getAllReadings(): Observable<Reading[]>
	{
		const url = `${this.dbUrl}/readings/`
		return this.http.get<Reading[]>(url, httpOptions).catch((err: HttpErrorResponse) =>
		{
			console.log(err);
			return Observable.empty<Reading[]>();
		});
	}

	private setSession(authResult) 
	{
		localStorage.setItem('id_token', authResult.token);
	}
	
	private checkAuth(authResult)
	{
		if (!authResult["auth"])
		{
			// Remove our token since it doesn't work
			localStorage.setItem('id_token', null);
		}
	}
}
