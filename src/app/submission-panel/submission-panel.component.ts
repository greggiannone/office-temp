import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-submission-panel',
	templateUrl: './submission-panel.component.html',
	styleUrls: ['./submission-panel.component.css']
})
export class SubmissionPanelComponent implements OnInit {

	currScreen: Screen;
	Screen = Screen;

	constructor() 
	{
		this.currScreen = Screen.Login;
		console.log(this.currScreen);
	}

	ngOnInit() 
	{
	}

	onLogin()
	{
		this.currScreen = Screen.Submit;
	}
}

enum Screen
{
	Login,
	Submit
}