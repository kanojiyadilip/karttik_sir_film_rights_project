import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-chip',
  templateUrl: './add-chip.component.html',
  styleUrls: ['./add-chip.component.css']
})
export class AddChipComponent implements OnInit {

  @Output() getChips = new EventEmitter<any>();
  @Input() chip: any;
  constructor() { }

  ngOnInit(): void {
    // this.chip
  }

  // chip: any = ['aaaaaa','bbbbbb', 'cccccc', 'dddddd', 'eeeeeee'];
  val: any;
  enter(event:any){
    console.log("==event====>", event);
    if(event.keyCode===13 && this.val){
      //submit form
      this.chip.push(this.val);
      this.val = '';
      this.getChips.emit(this.chip);
    }
  }

  remChip(idx:any){
    let newArr = this.chip.filter((item: any,i:any)=>i!=idx);
    this.chip = newArr;
    this.getChips.emit(this.chip);
  }

}
