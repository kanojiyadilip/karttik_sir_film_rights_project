import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from  'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http: HttpClient) { 
    this.basicDetail({});
  }

  // baseUrl: any = 'http://43.206.104.242:3001/api/films/'; 
  baseUrl: any = 'http://localhost:3001/api/films/'; 
  basicDetails: any;
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

  getFilmList(data: any) {
    return this.http.post(this.baseUrl+'get_Film_list', data);
  }

  getFilmRightList(data: any) {
    return this.http.post(this.baseUrl+'get_Film_right_list', data);
  }

  createFilmRight(data: any) {
    return this.http.post(this.baseUrl+'create_film_right', data);
  }

  searchClientName(data: any) {
    return this.http.post(this.baseUrl+'search_cl', data)
  }

  createUser(data: any) {
    return this.http.post(this.baseUrl+'create_user', data)
  }

  basicDetail(data: any) {
    return this.http.get(this.baseUrl+'basic_detail', data).subscribe((res: any)=>{
      this.basicDetails = res.data;

      console.log("=====basicDetails=======>", this.basicDetails);
    })
  }

  init() {
    console.log("socket service initialized");
  }
}
