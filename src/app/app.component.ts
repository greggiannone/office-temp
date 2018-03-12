import { Component } from '@angular/core';
import { DataAccessService } from './data-access.service';
import { Reading } from './models/reading';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  	title = 'app';

	currReading: Reading
	readings: Reading[];

	constructor(private DAService: DataAccessService) { }

	ngOnInit()
	{
		this.DAService.getCurrentReading().subscribe(reading => this.currReading = reading)
		this.DAService.getAllReadings().subscribe(readings => this.readings = readings);
	}
}
