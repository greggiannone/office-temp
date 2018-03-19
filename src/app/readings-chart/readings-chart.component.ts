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

	WeekString = "Full Week";
	private isShowingWeek = false;

	constructor() 
	{
		this.selectedDate = new Date();
		this.selectedDay = this.days()[this.selectedDate.getDay()-1];
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
			this.formattedData = [];
			this.setFormattedData(this.allReadings.filter(reading => this.equalDates(new Date(reading.time), this.selectedDate)));
		}
	}
	
	onClickDay(day: string)
	{
		this.selectedDay = day;

		if (day == this.WeekString)
		{
			this.showFullWeek();
			return;
		}

		// Set the Day to be the day that was just clicked
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
		items.push(this.WeekString);
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
		// Set the week start based on the new day
		this.weekStart = this.getWeekStart(this.selectedDate);
		// Set the week end based on the week start
		this.weekEnd = new Date(this.weekStart);
		this.weekEnd.setDate(this.weekStart.getDate() + 4);

		if (this.selectedDay == this.WeekString)
		{
			this.showFullWeek();
		}
		else
		{
			this.selectedDateChanged();
		}
	}

	private selectedDateChanged()
	{
		// Set the scale based on the current date
		this.xScaleMin = this.selectedDate.setHours(6, 0, 0, 0);
		this.xScaleMax = this.selectedDate.setHours(17, 0, 0, 0);
		// Refresh the data
		if (this.allReadings != null)
		{
			this.setFormattedData(this.allReadings.filter(reading => this.equalDates(new Date(reading.time), this.selectedDate)));
		}
	}

	private showFullWeek()
	{
		// Set the scale based on the current week
		this.xScaleMin = this.weekStart.setHours(0, 0, 0, 0);
		this.xScaleMax = this.weekEnd.setHours(23, 59, 59, 999);
		this.formattedData = [];
		// Refresh the data with all items between the week start/end
		if (this.allReadings != null)
		{
			var prevDay = this.weekStart;
			var currDay = new Date(prevDay);
			currDay.setDate(currDay.getDate() + 1);
			for (var i = 0; prevDay.getTime() < this.weekEnd.getTime(); i++)
			{
				var readings = this.allReadings.filter(reading =>
				{
					return prevDay.getTime() <= new Date(reading.time).getTime() && 
						currDay.getTime() >= new Date(reading.time).getTime();
				});

				this.addData(readings);

				prevDay = new Date(currDay);
				currDay.setDate(currDay.getDate() + 1);
			}

			this.calculateMinMax();
		}
	}

	private equalDates(day1: Date, day2: Date): boolean
	{
		return day1.getDate() == day2.getDate() && day1.getMonth() == day2.getMonth() &&
			day1.getFullYear() == day2.getFullYear();
	}

	private setFormattedData(readings: Reading[])
	{
		this.formattedData = [];
		this.addData(readings);
		this.calculateMinMax();
	}

	private addData(readings: Reading[])
	{
		var data = {};
		data["name"] = 'Temperature',
		data["series"] = [];

		if (readings.length == 0)
		{
			this.formattedData.push(data);
			return;
		}

		readings.forEach(reading =>
		{
			var entry = {
				'name': new Date(reading.time.toString()),
				'value': reading.temp,
			}
			data["series"].push(entry);
		});

		this.formattedData.push(data);
	}

	private calculateMinMax()
	{
		var min = 5000;
		var max = 0;
		this.formattedData.forEach(readings =>
		{
			if (readings["series"].length > 0)
			{
				var readingsMin = readings["series"].reduce((t1, t2) => 
				{
					if (t1.value > t2.value) return t2;
					else return t1;
				}).value;
				var readingsMax = readings["series"].reduce((t1, t2) => 
				{
					if (t1.value < t2.value) return t2;
					else return t1;
				}).value;

				min = Math.min(readingsMin, min);
				max = Math.max(readingsMax, max);
			}
		})

		this.minTemp = min;
		this.maxTemp = max;
		this.yScaleMax = max + 5;
		this.yScaleMin = min - 5;
	}

	private getWeekStart(today: Date): Date
	{
		var weekStart = new Date(today);

		weekStart.setDate(weekStart.getDate() - today.getDay() + 1);
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