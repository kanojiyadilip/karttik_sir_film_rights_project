import { Component } from '@angular/core';
import { NgbAlertModule, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
// import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

interface Country {
	name: string;
	flag: string;
	area: string;
	population: string;
}

const COUNTRIES: Country[] = [
  {
		name: 'Harish GALA',
		flag: 'f/f3/Flag_of_Russia.svg',
		area: '01/01/2016',
		population: 'India',
	},
	{
		name: 'Ketan Chheda',
		flag: 'f/f3/Flag_of_Russia.svg',
		area: '12/09/2015',
		population: 'India',
	},
	{
		name: 'Ashok Shah',
		flag: 'c/cf/Flag_of_Canada.svg',
		area: '01/05/2013',
		population: 'India',
	},
	{
		name: 'Manoj Deshai',
		flag: 'a/a4/Flag_of_the_United_States.svg',
		area: '01/02/2013',
		population: 'India',
	},
	{
		name: 'Harshad Patel',
		flag: 'f/fa/Flag_of_the_People%27s_Republic_of_China.svg',
		area: '07/12/2012',
		population: 'India',
	},
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
	title = 'kartik';
	value: Date=new Date();
	active = 1;
	countries = COUNTRIES;

  	// model: NgbDateStruct | undefined;
	// date: { year: number; month: number; } | undefined;

	constructor() {}

	selectToday() {
		// this.model = this.calendar.getToday();
	}

	newItem = {
		EndTime: null,
		StartTime: null
	};

}
