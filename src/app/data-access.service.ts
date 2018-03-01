import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Reading } from './models/reading'

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
		return this.http.post<Reading>(url, reading, httpOptions);
	}

}
