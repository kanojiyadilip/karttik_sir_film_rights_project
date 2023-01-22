import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
// import { abort } from 'proścess';
import swal from 'sweetalert2';
import { ServicesService } from '../services.service';
import { Subject } from 'rxjs';
// import 'rxjs/add/operator/debounceTime';
// import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

interface Country {
	name: string;
  director: string;
	flag: string;
	yearOfRelease: string;
	censorGrade: string;
}

const COUNTRIES: Country[] = [
  {
		name: 'Avatar',
    director: 'James Cameron',
		flag: 'f/f3/Flag_of_Russia.svg',
		yearOfRelease: '01/01/2016',
		censorGrade: 'A',
	},
	{
		name: 'Chhichhore',
    director: 'Nitesh Tiwari',
		flag: 'f/f3/Flag_of_Russia.svg',
		yearOfRelease: '12/09/2015',
		censorGrade: 'U',
	},
	{
		name: 'Drive',
    director: 'Tarun Mansukhani',
		flag: 'c/cf/Flag_of_Canada.svg',
		yearOfRelease: '01/05/2013',
		censorGrade: 'VU',
	},
	{
		name: 'The Avengers',
    director: 'Joss Whedon',
    flag: 'a/a4/Flag_of_the_United_States.svg',
		yearOfRelease: '01/02/2013',
		censorGrade: 'A',
	},
	{
		name: 'Black Adam',
    director: 'Jaume Collet-Serra',
		flag: 'f/fa/Flag_of_the_People%27s_Republic_of_China.svg',
		yearOfRelease: '07/12/2012',
		censorGrade: 'VU',
	},
];


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  countries = COUNTRIES;
  createNew: Number = 1;
  modelChanged: Subject<string> = new Subject<string>();


  constructor(private route: ActivatedRoute, private service: ServicesService) { 
    this.createNew = Number(this.route.snapshot.queryParamMap.get('createNew'));
    console.log("==createNew==>",this.createNew);
  }

  changed(text: string) {
    this.modelChanged.next(text);
  }


  dropdownList:any = [];
  selectedItems:any = [];
  dropdownSettings:any = {};

  dropdownList1:any = [];
  selectedItems1:any = [];
  dropdownSettings1:any = {};

  dropdownList2:any = [];
  selectedItems2:any = [];
  dropdownSettings2:any = {};

  accountVal: any = 1;
  account: any = [{id: 1, text: 'Sales'},{id: 2, text: 'Purchase'}];

  nameOfAssignor: any = "Harish GALA";
  dateOfAssignor: any = "2022-12-16";
  nameOfAssignee: any = "Harish GALA";

  userid: any;
  clientList: any = [{"name": "Zee TV"}];

  ngOnInit(): void {
    this.dropdownList = [
      { item_id: 1, item_text: 'Satellite Broadcasting Rights - Free & Pay / Subsciption TV' },
      { item_id: 2, item_text: 'Satellite VOD' },
      { item_id: 3, item_text: 'Satellite PPV' },
      { item_id: 4, item_text: 'Direct to Home (DTM)' },
      // { item_id: 5, item_text: 'New Delhi' }
    ];
    // this.selectedItems = [
    //   { item_id: 3, item_text: 'Pune' },
    //   { item_id: 4, item_text: 'Navsari' }
    // ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    }; 
    
    
    

    this.dropdownList1 = [
      { item_id: 1, item_text: 'Cable VOD' },
      { item_id: 2, item_text: 'Cable PPV' }
    ];
    
    // this.selectedItems = [
    //   { item_id: 3, item_text: 'Pune' },
    //   { item_id: 4, item_text: 'Navsari' }
    // ];
    this.dropdownSettings1 = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    }; 



    this.dropdownList2 = [
      { item_id: 1, item_text: 'Doordarshan' },
      { item_id: 2, item_text: 'Except Doordarshan' }
    ];
    
    // this.selectedItems = [
    //   { item_id: 3, item_text: 'Pune' },
    //   { item_id: 4, item_text: 'Navsari' }
    // ];
    this.dropdownSettings2 = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    }; 
    setTimeout(()=>{
      this.ref = false;
    },500)
    setTimeout(()=>{
      this.ref = true;
    },1000)

    this.userid = this.route.snapshot.queryParams['userid'];
    console.log("=====uId=====>", this.userid);

  }

  ref: boolean = false;

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  doa: any = {years: 2022, month: 12, day: 10}

  sbr: any = [
    {
      action: true
    }
  ];
  addrow(){
    this.add = true;
    // this.sbr.push(
    //   {
    //     action: 'add',
    //   }
    // )
  }

  editrow(item: any){
    console.log(this.sbr)
    let obj ={}
    this.sbr[item].action = false;
    console.log(this.sbr)
  }

  rowObj: any = {
    sbr: '',
    ter: '',
    com: '',
    exp: '',
  }

  add: boolean = false;

  addNew(item:any){
    this.sbr.push({...item, action: false});
  }

  submit(data:any){
    console.log("<====data====>", data);
    console.log("<====data====>", data.value);
    let val = {
      nameOfAssignor: data.value.nameOfAssignor,
      nameOfAssignee: data.value.nameOfAssignee,
      dateOfAgreement: data.value.dateOfAssignor, 
    }

    // return false;
    // let req = JSON.stringify(val);
    // console.log("============>>>>>>>>>",req);
    this.service.saveAssign(val).subscribe(res=>{
      console.log("===vv===>",res);
    });
    // console.log("===v===>",res);
  }

  search(e:any){
    console.log("==Search==>",this.nameOfAssignor)
    this.service.searchClientName({keys: this.nameOfAssignor}).subscribe((res:any)=>{
      console.log("===searchClientName===>",res);
      this.clientList = res.data;
    });
  }

}
