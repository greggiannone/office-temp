import { Component, OnInit, Input } from '@angular/core';
import { Reading } from '../models/reading';

@Component({
	selector: 'app-current-temp',
	templateUrl: './current-temp.component.html',
	styleUrls: ['./current-temp.component.css']
})
export class CurrentTempComponent implements OnInit {

	@Input() reading: Reading;

	constructor() { }

	ngOnInit() {
	}

}
