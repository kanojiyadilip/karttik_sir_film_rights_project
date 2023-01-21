import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-form-array',
  templateUrl: './form-array.component.html',
  styleUrls: ['./form-array.component.css']
})
export class FormArrayComponent implements OnInit {

  @Input() title: any;
  @Input() dropdownList: any;
  @Output() getFormArrayData = new EventEmitter<any>();
  natureOfRight: any = [{id: '1', item_text: 'Exclusive'}, {id: '2', item_text: 'Non-Exclusive'}];
  public isCollapsed = true;

  multiSelectDrop: any;
  selectedItems: any;
  dropdownSettings: any;

  exlng: any;
  exlngSelectedItems: any;

  constructor() { }
  
  ngOnInit(): void {
    
    setTimeout(()=>{
      this.ref = false;
    },500)
    setTimeout(()=>{
      this.ref = true;
    },1000)

    this.multiSelectDrop = [
      { item_id: 1, item_text: 'Hindi' },
      { item_id: 2, item_text: 'English' },
      { item_id: 3, item_text: 'Marathi' },
      { item_id: 4, item_text: 'Gujrati' },
      { item_id: 5, item_text: 'Telgu' }
    ];

    // this.exlng = [
    //   { item_id: 1, item_text: 'Hindi' },
    //   { item_id: 2, item_text: 'English' },
    //   { item_id: 3, item_text: 'Marathi' },
    //   { item_id: 4, item_text: 'Gujrati' },
    //   { item_id: 5, item_text: 'Telgu' }
    // ];
    // this.selectedItems = [
    //   { item_id: 3, item_text: 'Pune' },
    //   { item_id: 4, item_text: 'Navsari' }
    // ];
    this.dropdownSettings = {
      "singleSelection": false,
      "defaultOpen": false,
      "idField": "item_id",
      "textField": "item_text",
      "selectAllText": "Select All",
      "unSelectAllText": "UnSelect All",
      "enableCheckAll": true,
      "itemsShowLimit": 3,
      "allowSearchFilter": false,
      "limitSelection": -1
    };
    
  }

  ref: boolean = false;

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  onSelectAllExlang(items: any) {
    console.log(items);
  }

  onItemSelectExlang(item: any) {
    console.log(item);
  }


  sbr: any = [];

  addrow(){
    this.add = true;
    this.rowObj = {...this.rowObj, lng: [], elg: []};
  }

  editrow(item: any){
    console.log(this.sbr)
    let obj ={}
    this.sbr[item].action = false;
    console.log(this.sbr)
  }

  rowObj: any = {
    sbr: '',
    nor: '',
    dtc: '',
    lng: '',
    ter: '',
    com: '',
    exp: '',
    elg: '',
    etr: '',
    nrn: '',
  }

  add: boolean = false;

  addNew(item:any, cat: any){
    console.log(cat,"<====addNew===>",item);
    this.sbr.push({...item,category: cat.id, action: false});
    this.rowObj.sbr = ''; 
    this.add = false;
    // let sendData = {...this.sbr, category: cat.id}
    this.getFormArrayData.emit(this.sbr)
  }

  remove(item: any, i: any){
    let newArr = this.sbr.filter((e:any, idx:any)=>(idx!==i));
    this.sbr = newArr;
    this.getFormArrayData.emit(this.sbr)
  }

  selectedStatus: any;
  public setSelectedStatus(event: any) {

    let selectedOptions = event.target['options'];
    let selectedIndex = selectedOptions.selectedIndex;
    let selectElementText = selectedOptions[selectedIndex].text;
    console.log("------->>>---->>>",selectElementText)
   }
   


}
