import { Component, OnInit } from '@angular/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ServicesService } from '../services.service'
import swal from 'sweetalert2';


@Component({
  selector: 'app-film-detail',
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.css']
})
export class FilmDetailComponent implements OnInit {

  active = 1;
  createNew: Number = 1;
  filmId: any;
  filmRightData: any;
  loaded: boolean = false;
  filmData: any;
  constructor(private service: ServicesService, private route: ActivatedRoute, private router: Router, private datePipe: DatePipe) { 

    this.createNew = Number(this.route.snapshot.queryParamMap.get('createNew'));
    console.log("==createNew==>",this.createNew);

    this.filmId = this.route.snapshot.queryParams['filmid'];
    console.log("=====uId=====>", this.filmId);
    if(this.filmId){
      
      this.service.getFilmRightList({filmId: this.filmId}).subscribe((res:any)=>{
        console.log("===getFilmRightList===>",res);
        this.filmData = res.data.film || {};
        this.filmRightData = res.data.filmRight || [];

        // this.selectedItems = [
        //   {item_id: 2, item_text: 'English'},
        //   { item_id: 4, item_text: 'Gujrati' },
        //   { item_id: 5, item_text: 'Telgu' }
        // ];
        if(Object.getOwnPropertyNames(this.filmData).length){
          this.filmName = this.filmData.nameOfFilm;
          this.language = this.filmData.language.map((e:any)=>this.selectedItems.find((item:any)=>item.item_id == e));
          this.selectedItems = this.language;
          console.log("==language==>", this.language)
          this.version = this.filmData.version;
          this.yearOfRelease = this.datePipe.transform(this.filmData.yearOfRelease,'yyyy-MM-dd'); //this.filmData.yearOfRelease;
          this.director = this.filmData.director;
          this.censorGrade = this.filmData.censerGrade;
          this.proBanner = this.filmData.proBanner;
          this.producer = this.filmData.producer;
          this.starCast = this.filmData.starCast;
          this.mDirector = this.filmData.mDirector;
        }
        
        if(this.filmRightData.length){
          for(var i=0; i<this.formArrayData.length; i++){
            this.formArrayData[i].data = this.filmRightData.filter((e:any)=>e.category == this.formArrayData[i].id)
          }
          this.loaded = true;
        }
        else{
          this.loaded = true;
        }
        console.log("===this.formArrayData===>",this.formArrayData);

      });

    }
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

  // dilip

  versionList: any = [{id:"1", type: 'Color'}, {id:"2", type: 'Blackend White'}]
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
  userid: any;
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
    // this.fillData(data);

    this.userid = this.route.snapshot.queryParams['userid'];
    console.log("==========>", this.userid);
  }


  formArrayData = [
    {
      id: 1,
      title: 'SATELLITE BROADCASTING RIGHTS',
      dropdownList: [
        { item_id: 1, item_text: 'Satellite Broadcasting Rights - Free & Pay / Subsciption TV' },
        { item_id: 2, item_text: 'Satellite VOD' },
        { item_id: 3, item_text: 'Satellite PPV' },
        { item_id: 4, item_text: 'Direct to Home (DTM)' },
        { item_id: 5, item_text: 'Syndication Rights' },
      ],
      data: []
    },
    {
      id: 2,
      title: 'VIDEO ON DEMAND THROUGH CABLE, SATELLITE OR INTERNET',
      dropdownList: [
        { item_id: 1, item_text: 'nVOD' },
        { item_id: 2, item_text: 'AVOD' },
        { item_id: 3, item_text: 'FVOD' },
        { item_id: 4, item_text: 'SVOD' },
        { item_id: 5, item_text: 'TVOD' },
      ],
      data: []
    },
    {
      id: 3,
      title: 'INTERNET / NEW MEDIA RIGHTS',
      dropdownList: [
        { item_id: 1, item_text: 'YouTube / Daily Motion Rights' },
        { item_id: 2, item_text: 'Broadband Rights' },
        { item_id: 3, item_text: 'IPTV (Internet Protocol Television Rights)' },
        { item_id: 4, item_text: 'Web and Internet rights' },
        { item_id: 5, item_text: 'Mobile / Digital Television' },
      ],
      data: []
    },
    {
      id: 4,
      title: 'CABLE TELEVISION RIGHTS',
      dropdownList: [
        { item_id: 1, item_text: 'Free Cable TV' },
        { item_id: 2, item_text: 'Cable VOD' },
        { item_id: 3, item_text: 'Pay Cable TV Rights' }
      ],
      data: []
    },
    {
      id: 5,
      title: 'TERRESTRIAL TELEVISION',
      dropdownList: [
        { item_id: 1, item_text: 'Free Terrestrial TV' },
        { item_id: 2, item_text: 'Terrestrial TV Overseas' }
      ],
      data: []
    },
    {
      id: 6,
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
      ],
      data: []
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
    // swal.fire(
    //   'Record update successfully',
    //   '',
    //   'success'
    // )

    let langId = this.selectedItems.map((item:any)=>item.item_id)

    let val = {
      film_id: this.filmId,
      assign_id: this.userid,
      nameOfFilm: this.filmName,
      language: langId,
      version: this.version,
      yearOfRelease: this.yearOfRelease,
      director: this.director,
      censerGrade: this.censorGrade,
      proBanner: this.proBanner,
      producer: this.producer,
      starCast: this.starCast,
      mDirector: this.mDirector,
      // fRights: this.fRights
    }

    this.service.createFilm(val).subscribe((res:any)=>{
      console.log("===v===>",res);
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

  arrayData(data: any){
    console.log("------form-array-data------>", data);
    let arData: any = [];
    data.forEach((ele:any) => {
      let obj = {
        natureOfRight: ele.nor,
        deliveryTcqc: ele.dtc,
        language: ele.lng.map((item:any)=>item.item_id),
        exlLanguage: ele.elg.map((item:any)=>item.item_id),
        commencement: ele.com,
        expiry: ele.exp,
        territories: ele.ter,
        exclTerritories: ele.etr,
        noOfRuns: ele.nor,
        subCategory: ele.sbr,
        category: ele.category
      }
      arData.push(obj);
    });
    this.fRights = arData;
  }

  fRights: any = [];
  

}
