import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataAccessService } from '../data-access.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	@Output() onLogin = new EventEmitter();

	password: string;
	error: string;

	constructor(private DAService: DataAccessService) { }

	ngOnInit() 
	{
	}

	onClickLogin()
	{
		this.DAService.login(this.getId().toString() + 'hi', this.password).subscribe(result => 
		{
			if (result["auth"])
			{
				this.onLogin.emit();
			}
			else
			{
				this.error = "There was an error logging in";
			}
		});
	}

	// Found at https://stackoverflow.com/questions/41427192/angularjs-client-browser-fingerprint
	private getId()
	{
		return this.checksum([
			navigator.userAgent,
			[screen.height, screen.width, screen.colorDepth].join('x'),
			new Date().getTimezoneOffset(),
			!!window.sessionStorage,
			!!window.localStorage,
			this.map(navigator.plugins, function (plugin) {
				return [
					plugin.name,
					plugin.description
				].join("::");
			}).join(';')
		].join('###'));
	}

	private checksum(str)
	{
		var hash = 5381,
		i = str.length;

		while (i--) hash = (hash * 33) ^ str.charCodeAt(i);

		return hash >>> 0;
	}

	private map(arr, fn)
	{
		var i = 0, len = arr.length, ret = [];
        while(i < len){
            ret[i] = fn(arr[i++]);
        }
        return ret;
	}
}
