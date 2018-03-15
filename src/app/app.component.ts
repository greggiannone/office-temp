import { Component } from '@angular/core';
import { DataAccessService } from './data-access.service';
import { Reading } from './models/reading';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  	title = 'app';

	currReading: Observable<Reading>
	readings: Reading[];

	constructor(private DAService: DataAccessService) { }

	ngOnInit()
	{
		this.currReading = this.DAService.getCurrentReading();
		this.DAService.getAllReadings().subscribe(readings => this.readings = readings);
	}
}
