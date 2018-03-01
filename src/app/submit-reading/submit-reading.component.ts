import { Component, OnInit } from '@angular/core';
import { DataAccessService } from '../data-access.service'
import { Reading } from '../models/reading';

@Component({
	selector: 'app-submit-reading',
	templateUrl: './submit-reading.component.html',
	styleUrls: ['./submit-reading.component.css']
})
export class SubmitReadingComponent implements OnInit {

	reading: number;
	recentSubmission: string;

	constructor(private DAService: DataAccessService) { }

	ngOnInit() {
	}

	onSubmit()
	{
		this.DAService.addReading(<Reading>({
			temp: this.reading,
			time: new Date()
		})).subscribe(reading => this.recentSubmission = JSON.stringify(reading));
	}

}
