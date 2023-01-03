import { Component, OnInit } from '@angular/core';

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
		population: 'Sales',
	},
	{
		name: 'Ketan Chheda',
		flag: 'f/f3/Flag_of_Russia.svg',
		area: '12/09/2015',
		population: 'Purchase',
	},
	{
		name: 'Ashok Shah',
		flag: 'c/cf/Flag_of_Canada.svg',
		area: '01/05/2013',
		population: 'Sales',
	},
	{
		name: 'Manoj Deshai',
		flag: 'a/a4/Flag_of_the_United_States.svg',
		area: '01/02/2013',
		population: 'Purchase',
	},
	{
		name: 'Harshad Patel',
		flag: 'f/fa/Flag_of_the_People%27s_Republic_of_China.svg',
		area: '07/12/2012',
		population: 'Purchase',
	},
];


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  countries = COUNTRIES;

  constructor() { }

  ngOnInit(): void {
  }

}
