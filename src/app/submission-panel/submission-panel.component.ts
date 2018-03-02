import { Component, OnInit } from '@angular/core';
import { DataAccessService } from '../data-access.service';

@Component({
	selector: 'app-submission-panel',
	templateUrl: './submission-panel.component.html',
	styleUrls: ['./submission-panel.component.css']
})
export class SubmissionPanelComponent implements OnInit {

	currScreen: Screen;
	Screen = Screen;
	visible: boolean;

	constructor(private DAService: DataAccessService) 
	{
		// Wait until we check login to show a prompt
		this.currScreen = null;
		this.visible = false;
	}

	ngOnInit() 
	{
		this.DAService.isLoggedIn().subscribe(result =>
		{
			console.log('here');
			if (!result["auth"])
			{
				this.currScreen = Screen.Login;
			}
			else
			{
				this.currScreen = Screen.Submit;
			}
		})
	}

	onLogin()
	{
		this.currScreen = Screen.Submit;
	}

	logout()
	{
		// CURRENTLY FOR TESTING ONLY
		localStorage.setItem('id_token', null);
		this.currScreen = Screen.Login;
	}

	toggleVisible()
	{
		this.visible = !this.visible;
	}
}

enum Screen
{
	Login,
	Submit
}