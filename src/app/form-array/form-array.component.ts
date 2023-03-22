import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { DatePipe } from '@angular/common';
import { ServicesService } from '../services.service'
import swal from 'sweetalert2';

@Component({
  selector: 'app-form-array',
  templateUrl: './form-array.component.html',
  styleUrls: ['./form-array.component.css']
})
export class FormArrayComponent implements OnInit {

  @Input() data: any;
  @Input() topData: any;
  @Input() dropdownList: any;
  @Output() getFormArrayData = new EventEmitter<any>();
  natureOfRight: any = [{id: '1', item_text: 'Exclusive'}, {id: '2', item_text: 'Non-Exclusive'}];
  public isCollapsed = true;
  popupTitle: any = "";

  multiSelectDrop: any;
  selectedItems: any;
  dropdownSettings: any;

  exlng: any;
  exlngSelectedItems: any;

  constructor(private service: ServicesService, private datePipe: DatePipe) { 
    console.log(this.dropdownList,"==========data==========>",this.data);
    console.log("=====LANGUAGES======1=>", this.service.basicDetails.languages);
    this.multiSelectDrop = this.service.basicDetails.languages.map((e:any)=>({item_id: e.id, item_text: e.lable}))
    this.lanList = this.multiSelectDrop;
    console.log("=====LANGUAGES======2=>", this.multiSelectDrop);
    console.log("=====LANGUAGES======3=>", this.lanList);
  }
  
  ngOnInit(): void {
    this.getCountryByRegion();
    this.data = this.data.map((e:any)=>({...e, subCategoryVal: this.dropdownList.find((item:any)=>item.item_id == e.subCategory).item_text }))
    // console.log(this.dropdownList.find((item:any)=>item.item_id == 1).item_text,"==========DILIP==========>",this.data);
    
    setTimeout(()=>{
      this.ref = false;
    },500)
    setTimeout(()=>{
      this.ref = true;
    },1000)

    // this.multiSelectDrop = [
    //   { item_id: 1, item_text: 'Hindi' },
    //   { item_id: 2, item_text: 'English' },
    //   { item_id: 3, item_text: 'Marathi' },
    //   { item_id: 4, item_text: 'Gujrati' },
    //   { item_id: 5, item_text: 'Telgu' }
    // ];

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

  ctyData: any;

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
   
  displayStyle = "none";

  lanList: any;
  
  openPopup(val:any) {
    if(val=="save"){
      this.popupTitle = "Add New Data"
    }else{
      this.popupTitle = "Update Data"
      console.log("==val==>", val);
      this.rowObj = {
        film_right_id: val._id || '',
        sbr: val.subCategory,
        nor: val.natureOfRight,
        dtc: this.datePipe.transform(val.deliveryTcqc,'yyyy-MM-dd'),//'2022-10-12',//val.deliveryTcqc,
        lng: val.language.map((e:any)=>this.lanList.find((item:any)=>item.item_id == e)),
        com: this.datePipe.transform(val.commencement,'yyyy-MM-dd'),
        exp: this.datePipe.transform(val.expiry,'yyyy-MM-dd'),
        elg: val.exlLanguage.map((e:any)=>this.lanList.find((item:any)=>item.item_id == e)),
        ter: val.territories,
        etr: val.exclTerritories,
        nrn: val.noOfRuns
      }
    }

    for(var i=0; i<val.territories.length; i++){
      let obj = this.countryData.find(e=>e.id == val.territories[i])
      this.ter.push(obj);
    }

    // this.ter = val.territories
    this.displayStyle = "block";
  }

  closePopup() {
    this.displayStyle = "none";
  }

  addNewFilmRight(){
    let req = {
      film_id: this.topData.filmId,
      category: this.topData.id,
      film_right_id: this.rowObj.film_right_id || '',
      subCategory: this.rowObj.sbr,
      natureOfRight: this.rowObj.nor,
      deliveryTcqc: this.rowObj.dtc,
      language: this.rowObj.lng,
      exlLanguage: this.rowObj.elg,
      commencement: this.rowObj.com,
      expiry: this.rowObj.exp,
      territories: this.ter.map((e:any)=>e.id),
      // exclTerritories: this.rowObj.etr,
      noOfRuns: this.rowObj.nrn
    }
    this.service.createFilmRight(req).subscribe((res:any)=>{
      console.log("===v===>",res);
      if(res.code == 200){
        swal.fire(
          res.msg,
          '',
          'success'
        ).then(() => {
          // this.router.navigate(['/']);
          this.closePopup();
        })
      }
      else{
        swal.fire(
          res.msg,
          '',
          'error'
        )
      }
    });
  }

  inDetail: any = {
    title: "Details",
    subCategoryVal: "",
    natureOfRight: "",
    commencement: "",
    expiry: "",
    Territories: "",
    exclTerritories: "",
    noOfRuns: "",
    // subCategoryVal: "",
    // subCategoryVal: "",
    // subCategoryVal: ""
  };
  inDetailVisible:any = "none";
  detailPopup(val:any){
    console.log("val=>", val)
    this.inDetail = val;
    this.inDetail.language = this.inDetail.language.map((e:any)=>this.lanList.find((item:any)=>item.item_id == e)).map((e:any)=>e.item_text);
    this.inDetail.exlLanguage = this.inDetail.exlLanguage.map((e:any)=>this.lanList.find((item:any)=>item.item_id == e)).map((e:any)=>e.item_text);
    console.log("this.inDetail=>", this.inDetail)
    this.inDetailVisible = "block";
  }

  countryData = [
    {
      id: '1',
      country: 'India',
      region: 'Asia'
    },
    {
      id: '2',
      country: 'Pakistan',
      region: 'Asia'
    },
    {
      id: '3',
      country: 'France',
      region: 'Europe'
    }
  ];

  getCountryByRegion(){
    let cr = [...new Set(this.countryData.map(e=>e.region))];
    console.log(cr);
    let newArray = [];
    for(var i=0; i<cr.length; i++){
      newArray.push({
        parent: cr[i],  
        child: this.countryData.filter(e=>e.region == cr[i])
      })
    }
    console.log("===newArray===>",newArray);
    this.ctyData = newArray;
  }

  ter: any = [];
  territoryData(val:any){
    if(val.length){
    this.ter.push(...val);
    }
    else{
      this.ter.push(val);
    }
    this.ter =  [...new Set(this.ter)];
    console.log(val,'<======>', this.ter);
  }

  revmoveTerritoryData(val:any){
    this.ter = this.ter.filter((e:any)=>e.id != val.id)
  }

}
