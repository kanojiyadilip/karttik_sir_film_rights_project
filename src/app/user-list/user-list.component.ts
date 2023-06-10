import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services.service';
interface Country {
	nameOfAssignee: string;
	nameOfAssignor: string;
	flag: string;
	dateOfAgreement: string;
	accountType: string;
	_id: string
}


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  countries: any = [];

  constructor(private service: ServicesService) { }

  ngOnInit(): void {

	this.service.getAssign().subscribe((res:any)=>{
		console.log("===get===>",res);
		this.countries = res['data']
	});
  }

}
