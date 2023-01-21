;import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from  'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http: HttpClient) { }

  baseUrl: any = 'http://localhost:3001/api/films/'; 
  saveAssign(data: any) {
    // let data = {
    //   nameOfAssignor: 'Harish GALA',
    //   dateOfAssignor: '2022-12-16',
    //   nameOfAssignee: 'Harish GALA',
    //   accountVal: 1
    // };
    // let datam = JSON.stringify(data);
    // console.log("======data>>>>>>", data);
    return this.http.post(this.baseUrl+'create_assign', data)
  }

  getAssign(){
    return this.http.get(this.baseUrl+'get_assign')
  }

  createFilm(data: any) {
    return this.http.post(this.baseUrl+'create_film', data)
  }

}
