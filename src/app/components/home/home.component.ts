import { Component, OnInit } from '@angular/core';
import { ElectronService } from '../../providers/electron.service';
import { DataService } from '../../data.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: [ './home.component.scss' ]
})
export class HomeComponent implements OnInit {
	channelInfo: any;
	channelSubscription: Subscription;
	ChannelList: Array<String> = []; // channels Array

	constructor(private electron: ElectronService, private data: DataService) {}

	ngOnInit() {
		this.channel('');
	}

	closeWindow() {
		this.electron.window.close();
	}

	minimizeWindow() {
		this.electron.window.minimize();
	}

	channel(name) {
	  // console.log('Start: ' + this.ChannelList);

		if (this.channelSubscription) this.channelSubscription.unsubscribe();

		this.ChannelList.push(name); // push the new channel ID into the array
		// console.log('End: ' + this.ChannelList);

		this.channelSubscription = this.data.getStats(this.ChannelList).subscribe((res) => { 
			this.channelInfo = res;
			console.log(res);
		});

		//console.log(name);
	}
}
