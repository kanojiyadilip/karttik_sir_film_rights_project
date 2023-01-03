import { Component, OnInit } from '@angular/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';

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
  selector: 'app-film-detail',
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.css']
})
export class FilmDetailComponent implements OnInit {

  active = 1;

  countries = COUNTRIES;

  constructor() { }

  dropdownList:any = [];
  selectedItems:any = [];
  dropdownSettings:any = {};

  dropdownList1:any = [];
  selectedItems1:any = [];
  dropdownSettings1:any = {};

  dropdownList2:any = [];
  selectedItems2:any = [];
  dropdownSettings2:any = {};

  // dilip

  versionList: any = [{id:1, type: 'Color'}, {id:2, type: 'Blackend White'}]
  censorGradeList: any = [{id:1, grade: 'A'}, {id:2, grade: 'U'}, {id:3, grade: 'VU'}, {id:4, grade: 'VUA'}, {id:5, grade: 'UA'}]

  filmName: any;
  language: any;
  version: any;
  yearOfRelease: any;
  proBanner: any;
  producer: any;
  director: any;
  starCast: any;
  mDirector: any;
  censorGrade: any;


  multiSelectDrop: any = [];
  ngOnInit(): void {
    this.dropdownList = [
      { item_id: 1, item_text: 'Satellite Broadcasting Rights - Free & Pay / Subsciption TV' },
      { item_id: 2, item_text: 'Satellite VOD' },
      { item_id: 3, item_text: 'Satellite PPV' },
      { item_id: 4, item_text: 'Direct to Home (DTM)' },
    ];

    this.multiSelectDrop = [
      { item_id: 1, item_text: 'Hindi' },
      { item_id: 2, item_text: 'English' },
      { item_id: 3, item_text: 'Marathi' },
      { item_id: 4, item_text: 'Gujrati' },
      { item_id: 5, item_text: 'Telgu' }
    ];

    this.selectedItems = [
      {item_id: 2, item_text: 'English'},
      { item_id: 4, item_text: 'Gujrati' },
      { item_id: 5, item_text: 'Telgu' }
    ];
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


    let data = {
      filmName: 'Avatar',
      selectedItems: [
        {item_id: 2, item_text: 'English'},
        { item_id: 4, item_text: 'Gujrati' },
        { item_id: 5, item_text: 'Telgu' }
      ],
      version: 'Blackend White',
      yearOfRelease: '2022-12-16',
      proBanner: ['banner123'],
      producer: ['Jon Landau'],
      director: 'James Cameron',
      starCast: ['Jon Landau', 'Sam Worthington', 'Sigourney Weaver', 'Michelle Rodriguez', 'Laz Alonso'],
      mDirector: ['James Horner'],
      censorGrade: 'A'
    }
    this.fillData(data);
  }

  formArrayData = [
    {
      title: 'SATELLITE BROADCASTING RIGHTS',
      dropdownList: [
        { item_id: 1, item_text: 'Satellite Broadcasting Rights - Free & Pay / Subsciption TV' },
        { item_id: 2, item_text: 'Satellite VOD' },
        { item_id: 3, item_text: 'Satellite PPV' },
        { item_id: 4, item_text: 'Direct to Home (DTM)' },
        { item_id: 5, item_text: 'Syndication Rights' },
      ]
    },
    {
      title: 'VIDEO ON DEMAND THROUGH CABLE, SATELLITE OR INTERNET',
      dropdownList: [
        { item_id: 1, item_text: 'nVOD' },
        { item_id: 2, item_text: 'AVOD' },
        { item_id: 3, item_text: 'FVOD' },
        { item_id: 4, item_text: 'SVOD' },
        { item_id: 5, item_text: 'TVOD' },
      ]
    },
    {
      title: 'INTERNET / NEW MEDIA RIGHTS',
      dropdownList: [
        { item_id: 1, item_text: 'YouTube / Daily Motion Rights' },
        { item_id: 2, item_text: 'Broadband Rights' },
        { item_id: 3, item_text: 'IPTV (Internet Protocol Television Rights)' },
        { item_id: 4, item_text: 'Web and Internet rights' },
        { item_id: 5, item_text: 'Mobile / Digital Television' },
      ]
    },
    {
      title: 'CABLE TELEVISION RIGHTS',
      dropdownList: [
        { item_id: 1, item_text: 'Free Cable TV' },
        { item_id: 2, item_text: 'Cable VOD' },
        { item_id: 3, item_text: 'Pay Cable TV Rights' }
      ]
    },
    {
      title: 'TERRESTRIAL TELEVISION',
      dropdownList: [
        { item_id: 1, item_text: 'Free Terrestrial TV' },
        { item_id: 2, item_text: 'Terrestrial TV Overseas' }
      ]
    },
    {
      title: 'Anciliary / Other RIGHTS',
      dropdownList: [
        { item_id: 1, item_text: 'Music Rights' },
        { item_id: 2, item_text: 'Audio / Visuals rights' },
        { item_id: 3, item_text: 'Clipping (Audio & Video)' },
        { item_id: 1, item_text: 'Dubbing Rights' },
        { item_id: 2, item_text: 'Subtitle Rights' },
        { item_id: 3, item_text: 'Sublicensing Rights' },
        { item_id: 4, item_text: 'Remaking Rights' },
        { item_id: 5, item_text: 'Sequel Rights' },
        { item_id: 6, item_text: 'Prequel Rights' },
        { item_id: 7, item_text: 'Spin Off Rights' },
        { item_id: 8, item_text: 'Airborne' },
      ]
    },
    // {
    //   title: 'Clipping (Audio & Video)',
    //   dropdownList: [
    //     { item_id: 1, item_text: 'Dubbing Rights' },
    //     { item_id: 2, item_text: 'Subtitle Rights' },
    //     { item_id: 3, item_text: 'sublicensing Rights' },
    //     { item_id: 4, item_text: 'Remaking Rights' },
    //     { item_id: 5, item_text: 'Sequel Rights' },
    //     { item_id: 6, item_text: 'Prequel Rights' },
    //     { item_id: 7, item_text: 'Spin Off Rights' },
    //     { item_id: 8, item_text: 'Airborne' },
    //   ]
    // }
  ]


  ref: boolean = false;

  onItemSelectlan(item: any) {
    console.log(item);
  }
  onSelectAlllan(items: any) {
    console.log(items);
  }

  doa: any = {years: 2022, month: 12, day: 10}

  sbr: any = [
    {
      action: true
    }
  ];
  // addrow(){
  //   this.add = true;
  //   // this.sbr.push(
  //   //   {
  //   //     action: 'add',
  //   //   }
  //   // )
  // }

  // editrow(item: any){
  //   console.log(this.sbr)
  //   let obj ={}
  //   this.sbr[item].action = false;
  //   console.log(this.sbr)
  // }

  // rowObj: any = {
  //   sbr: '',
  //   ter: '',
  //   com: '',
  //   exp: '',
  // }

  add: boolean = false;

  // addNew(item:any){
  //   this.sbr.push({...item, action: false});
  //   this.add = false;
  // }

  // remove(item: any, i: any){
  //   let newArr = this.sbr.filter((e:any, idx:any)=>(idx!==i));
  //   this.sbr = newArr;
  // }

  public pBann(data: any):void {
    console.log('Picked date: ', data);
    this.proBanner = data;
  
  }

  public produ(data: any):void {
    console.log('Picked date: ', data);
    this.producer = data;
  
  }

  public sCast(data: any):void {
    console.log('Picked date: ', data);
    this.starCast = data;
  
  }

  public mdir(data: any):void {
    console.log('Picked date: ', data);
    this.mDirector = data
  
  }

  submit(){
    console.log("=this.filmName=>",this.filmName);
    console.log("=this.language=>",this.selectedItems);
    console.log("=this.version=>",this.version);
    console.log("=this.yearOfRelease=>",this.yearOfRelease);
    console.log("=this.proBanner=>",this.proBanner);
    console.log("=this.producer=>",this.producer);
    console.log("=this.director=>",this.director);
    console.log("=this.starCast=>",this.starCast);
    console.log("=this.mDirector=>",this.mDirector);
    console.log("=this.censorGrade=>",this.censorGrade);
    swal.fire(
      'Record update successfully',
      '',
      'success'
    )
  }

  fillData(data: any){
    this.filmName = data.filmName;
    this.selectedItems = data.selectedItems;
    this.version = data.version;
    this.yearOfRelease = data.yearOfRelease;
    this.proBanner = data.proBanner;
    this.producer = data.producer;
    this.director = data.director;
    this.starCast = data.starCast;
    this.mDirector = data.mDirector;
    this.censorGrade = data.censorGrade;
    // this.filmName = data.filmName;

  }






  // ref: boolean = false;

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


  // sbr: any = [];

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
  };
  natureOfRight: any = [{id: '1', item_text: 'Exclusive'}, {id: '2', item_text: 'Non-Exclusive'}];
  exlng: any;
  exlngSelectedItems: any;

  // add: boolean = false;

  addNew(item:any){
    console.log("====addNew===>",item);
    this.sbr.push({...item, action: false});
    this.rowObj.sbr = ''; 
    this.add = false;
  }

  remove(item: any, i: any){
    let newArr = this.sbr.filter((e:any, idx:any)=>(idx!==i));
    this.sbr = newArr;
  }
  

}
