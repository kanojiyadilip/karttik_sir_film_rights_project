import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
// import { abort } from 'proścess';
import swal from 'sweetalert2';
import { ServicesService } from '../services.service';
import { Subject } from 'rxjs';
// import 'rxjs/add/operator/debounceTime';
// import { debounceTime, distinctUntilChanged } from 'rxjs/operators';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  countries: any =[];
  createNew: Number = 1;
  modelChanged: Subject<string> = new Subject<string>();
  multiSelectDrop: any = [{item_id:"", item_text: ""}];
  multiSelectDrop2: any = [{item_id:"", item_text: ""}];


  constructor(private route: ActivatedRoute, private router: Router, private service: ServicesService) { 
    this.createNew = Number(this.route.snapshot.queryParamMap.get('createNew'));
    // this.multiSelectDrop = [
    //   { item_id: 1, item_text: 'Hindi' },
    //   { item_id: 2, item_text: 'English' },
    //   { item_id: 3, item_text: 'Marathi' },
    //   { item_id: 4, item_text: 'Gujrati' },
    //   { item_id: 5, item_text: 'Telgu' }
    // ];
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
  clientList: any; //= [{"name": "Zee TV"}];

  ngOnInit(): void {
    // this.dropdownList = this.clientList.map((item:any)=>({item_id: "", item_text: item.name}));
    this.dropdownList = [
      // { item_id: 5, item_text: 'New Delhi' }
    ];
    // this.selectedItems = [
    //   { item_id: 3, item_text: 'Pune' },
    //   { item_id: 4, item_text: 'Navsari' }
    // ];
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      // selectAllText: 'Select All',
      // unSelectAllText: 'UnSelect All',
      // itemsShowLimit: 3,
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
    if(this.userid){
      
      this.service.getFilmList({assignId: this.userid}).subscribe((res:any)=>{
        console.log("===getFilmList===>",res);
        this.countries = res.data;
      });

    }

  }

  ref: boolean = false;

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  onItemSelect2(item: any) {
    console.log(item);
  }
  onSelectAll2(items: any) {
    console.log("===>",items);
  }

  onFilterChange2(event: any) {
    console.log("===>",event);
    this.search(event, "nee");
  }

  onFilterChange(event: any){
    console.log("event", event);
    this.search(event, "nor");
  
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
    console.log(this.selectedItems,this.selectedItems,"<====data====>", data);
    console.log(this.selectedItems1,this.selectedItems,"<====data====>", data.value);
    let val = {
      nameOfAssignor: this.selectedItems[0].item_text,// data.value.nameOfAssignor,
      nameOfAssignee: this.selectedItems1[0].item_text,// data.value.nameOfAssignee,
      dateOfAgreement: data.value.dateOfAssignor, 
      accountType: data.value.accountVal
    }

    // return false;
    // let req = JSON.stringify(val);
    // console.log("============>>>>>>>>>",req);
    this.service.saveAssign(val).subscribe((res:any)=>{
      console.log("===vv===>",res);
      if(res.code == 200){
        swal.fire(
          res.msg,
          '',
          'success'
        ).then(() => {
          this.router.navigate(['/']);
        })
      }
      else{
        swal.fire(
          "Something went wrong!",
          '',
          'error'
        )
      }
    });
    // console.log("===v===>",res);
  }

  search(e:any, ty:any){
    console.log("==Search==>",e)
    this.service.searchClientName({keys: e}).subscribe((res:any)=>{
      console.log("===searchClientName===>",res);
      this.clientList = res.data;
      this.dropdownList = this.clientList.map((item:any, i: any)=>({item_id: i, item_text: item.name}));
      if(ty=="nor"){
        console.log("==selectedItems2==>", this.selectedItems2)
        this.multiSelectDrop = this.dropdownList;
      }
      else{
        console.log("==selectedItems==>", this.selectedItems)
        this.dropdownList = (this.selectedItems.length>0)?this.dropdownList.filter((item:any)=>item.item_text!=this.selectedItems[0].item_text):this.dropdownList;
        this.multiSelectDrop2 = this.dropdownList;
      }
      

    });
  }

  selectVal(event: any){
    console.log("=event=>", event);
  }

  

}
