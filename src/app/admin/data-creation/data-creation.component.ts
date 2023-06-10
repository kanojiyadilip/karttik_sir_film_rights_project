import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-data-creation',
  templateUrl: './data-creation.component.html',
  styleUrls: ['./data-creation.component.css']
})
export class DataCreationComponent implements OnInit {

  constructor(private service: ServicesService) { }

  ngOnInit(): void {
    this.getCl();
  }

  public changeListener(fileInput: any) {
    // (fileInput.target as HTMLInputElement).files[0];

    let file = fileInput.target.files[0];
    console.log('====file====>',file)
    let fileName = file.name;  
    
    let payload = {
      file,
    }
    
    let formData: FormData = new FormData();
    formData.append('usersListCsv',file,file.name);
    console.log('====formData====>',formData)

    this.service.createUser(formData).subscribe((res:any)=>{
      console.log("===get===>",res);
      if(res.code == 200){
        swal.fire(
          'Record update successfully',
          '',
          'success'
        )
      }
      else{
        swal.fire(
          "Something went wrong!",
          '',
          'error'
        )
      }
      // this.countries = res['data']
    });
  }

  client: any = [{name: "DILP"}];
  add: boolean = false;
  clientName: any;
  saveName(cn: any){

    if(cn){
      this.service.createClient({clientName: cn}).subscribe((res:any)=>{
        console.log("===get===>",res);
        if(res.code == 200){
          this.add = false;
          this.getCl();
          swal.fire(
            'Record update successfully',
            '',
            'success'
          )
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
  }

  getCl(){

    this.service.getClient({}).subscribe((res:any)=>{
      console.log("===get===>",res);
      if(res.code == 200){
        this.client = res.data;
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

  lowerCase(event:any, val: any){
    console.log("event=>", event)
    val = val.toLowerCase();
    // return val.toLowerCase()
  }
}
