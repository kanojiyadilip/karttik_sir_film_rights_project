import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services.service';

@Component({
  selector: 'app-data-creation',
  templateUrl: './data-creation.component.html',
  styleUrls: ['./data-creation.component.css']
})
export class DataCreationComponent implements OnInit {

  constructor(private service: ServicesService) { }

  ngOnInit(): void {
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
      // this.countries = res['data']
    });
  }
  

}
