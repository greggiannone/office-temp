import { Component, OnInit } from '@angular/core';
import { DataAccessService } from '../data-access.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
	selector: 'app-submission-panel',
	templateUrl: './submission-panel.component.html',
	styleUrls: ['./submission-panel.component.css'],
	animations: [
		trigger('loginVisible', [
			state('visible', style({ 
				'height': '*',
			})),
			state('collapsed', style({ 
				'height': '0px',
				'padding-top': '0px',
				'padding-bottom': '0px'
			})),
			transition('visible => collapsed', animate('400ms ease')),
			transition('collapsed => visible', animate('400ms ease'))
		])
	]
})
export class SubmissionPanelComponent implements OnInit {

	currScreen: Screen;
	Screen = Screen;
	visible: string;

	constructor(private DAService: DataAccessService) 
	{
		// Wait until we check login to show a prompt
		this.currScreen = null;
		this.visible = 'collapsed';
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

	onLogout()
	{
		this.currScreen = Screen.Login;
	}

	toggleVisible()
	{
		this.visible = this.visible === 'collapsed' ? 'visible' : 'collapsed';
	}
}

enum Screen
{
	Login,
	Submit
}