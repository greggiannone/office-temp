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
			if (reading["error"])
			{
				this.result = reading["error"]
			}
			else
			{
				this.result = `A temperature of ${reading["temp"]} has been added.`;
				this.onSubmit.emit();
			}
		});
	}

}
