import { Component, OnInit, Input, SimpleChange } from '@angular/core';
import { Reading } from '../models/reading';

@Component({
	selector: 'app-readings-chart',
	templateUrl: './readings-chart.component.html',
	styleUrls: ['./readings-chart.component.css']
})
export class ReadingsChartComponent implements OnInit {

	@Input() readings: Reading[];

	formattedData: any[] = [];
	view: any[] = [700, 400];

	showXAxis = true;
	showYAxis = true;
	gradient = false;
	showLegend = false;
	showXAxisLabel = false;
	xAxisLabel = 'Time';
	showYAxisLabel = true;
	yAxisLabel = 'Temperature';
	xScaleMin = new Date().setHours(6, 0, 0, 0);
	xScaleMax = new Date().setHours(17, 0, 0, 0);
  
	colorScheme = {
	  domain: ['#DD8E4D']
	};
  
	// line, area
	autoScale = true;
	constructor() { }

	ngOnInit() 
	{
	}

	ngOnChanges(changes: SimpleChange)
	{
		// Make sure the change event is from the match input
		if (changes['readings'] && changes['readings'].currentValue)
		{
			this.formattedData[0] = {};
			this.formattedData[0].name = 'Temperature',
			this.formattedData[0].series = [];
			this.readings.forEach(reading =>
			{
				var entry = {
					'name': new Date(reading.time.toString()),
					'value': reading.temp,
				}
				this.formattedData[0].series.push(entry);
			});
		}
	}

}
