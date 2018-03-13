import { Component, OnInit, Input, SimpleChange } from '@angular/core';
import { Reading } from '../models/reading';

@Component({
	selector: 'app-readings-chart',
	templateUrl: './readings-chart.component.html',
	styleUrls: ['./readings-chart.component.css']
})
export class ReadingsChartComponent implements OnInit {

	@Input() allReadings: Reading[];

	selectedDay: string;
	weekStart: Date;
	weekEnd: Date;
	selectedDate: Date;
	minTemp: number;
	maxTemp: number;

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
	yScaleMin = 60;
	yScaleMax = 80;
	colorScheme = {
	  domain: ['#DD8E4D']
	};
	autoScale = true;
	xScaleMin;
	xScaleMax;
	animations = false;

	

	constructor() 
	{
		this.selectedDate = new Date();
		this.weekChanged();
	}

	ngOnInit() 
	{
	}

	ngOnChanges(changes: SimpleChange)
	{
		// Make sure the change event is from the match input
		if (changes['allReadings'] && changes['allReadings'].currentValue)
		{
			this.setFormattedChanges(this.allReadings.filter(reading => this.equalDates(new Date(reading.time), this.selectedDate)));
		}
	}
	
	onClickDay(day: string)
	{
		// Set the Day to be the day that was just clicked
		this.selectedDay = day;
		// Set the Date based on the day enum
		// We create a new day based on the week start so Date can handle the month properly
		var newDay = new Date(this.weekStart);
		newDay.setDate(newDay.getDate() + Day[this.selectedDay] - 1);
		this.selectedDate = newDay;
		this.selectedDateChanged();
	}
	
	days(): Array<string>
	{
		var keys = Object.keys(Day);
		var items = keys.slice(keys.length / 2);
		return items;
	}

	onClickNextWeek()
	{
		// Move the current day up by 7 days
		this.selectedDate.setDate(this.selectedDate.getDate() + 7);
		this.weekChanged();
	}
	
	onClickPreviousWeek()
	{
		// Move the current day back by 7 days
		this.selectedDate.setDate(this.selectedDate.getDate() - 7);
		this.weekChanged();
	}

	private weekChanged()
	{
		this.selectedDay = this.days()[this.selectedDate.getDay()-1];
		// Set the week start based on the new day
		this.weekStart = this.getWeekStart(this.selectedDate);
		// Set the week end based on the week start
		this.weekEnd = new Date(this.weekStart);
		this.weekEnd.setDate(this.weekStart.getDate() + 4);
		this.selectedDateChanged();
	}

	private selectedDateChanged()
	{
		// Set the scale based on the current date
		this.xScaleMin = this.selectedDate.setHours(6, 0, 0, 0);
		this.xScaleMax = this.selectedDate.setHours(17, 0, 0, 0);
		// Refresh the data
		if (this.allReadings != null)
		{
			this.setFormattedChanges(this.allReadings.filter(reading => this.equalDates(new Date(reading.time), this.selectedDate)));
		}
	}

	private equalDates(day1: Date, day2: Date): boolean
	{
		return day1.getDate() == day2.getDate() && day1.getMonth() == day2.getMonth() &&
			day1.getFullYear() == day2.getFullYear();
	}

	private setFormattedChanges(readings: Reading[])
	{
		this.formattedData = [];
		this.formattedData[0] = {};
		this.formattedData[0].name = 'Temperature',
		this.formattedData[0].series = [];

		if (readings.length == 0)
		{
			return;
		}

		readings.forEach(reading =>
		{
			var entry = {
				'name': new Date(reading.time.toString()),
				'value': reading.temp,
			}
			this.formattedData[0].series.push(entry);
		});
		
		this.minTemp = readings.reduce((t1, t2) => 
		{
			if (t1.temp > t2.temp) return t2;
			else return t1;
		}).temp;
		this.maxTemp = readings.reduce((t1, t2) => 
		{
			if (t1.temp < t2.temp) return t2;
			else return t1;
		}).temp;
	}

	private getWeekStart(today: Date): Date
	{
		var weekStart = new Date(today);

		weekStart.setDate(weekStart.getDate() - today.getDay() + 1);
		console.log(today);
		console.log(weekStart);
		return weekStart;
	}
}

enum Day
{
	Monday = 1,
	Tuesday = 2,
	Wednesday = 3,
	Thursday = 4,
	Friday = 5,
}