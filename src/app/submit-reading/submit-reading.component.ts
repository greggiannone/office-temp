import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataAccessService } from '../data-access.service'
import { Reading } from '../models/reading';

@Component({
	selector: 'app-submit-reading',
	templateUrl: './submit-reading.component.html',
	styleUrls: ['./submit-reading.component.css']
})
export class SubmitReadingComponent implements OnInit {

	@Output() onSubmit = new EventEmitter();

	reading: number;
	result: string;

	constructor(private DAService: DataAccessService) { }

	ngOnInit() {
	}

	onClickSubmit()
	{
		this.DAService.addReading(<Reading>({
			temp: this.reading,
			time: new Date()
		})).subscribe(reading => 
		{
			this.result = JSON.stringify(reading);
			this.onSubmit.emit();
		});
	}

}
