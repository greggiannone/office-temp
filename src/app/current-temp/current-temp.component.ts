import { Component, OnInit, Input } from '@angular/core';
import { Reading } from '../models/reading';
import { Observable } from 'rxjs/Observable';

@Component({
	selector: 'app-current-temp',
	templateUrl: './current-temp.component.html',
	styleUrls: ['./current-temp.component.css']
})
export class CurrentTempComponent implements OnInit {

	@Input() reading: Observable<Reading>;

	constructor() { }

	ngOnInit() {
	}

}
