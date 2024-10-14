import { Component } from '@angular/core';
import { IsStation } from 'src/app/models/station';
import { StationService } from 'src/app/services/services';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor (private stationser:StationService){

  }
  // stationList:IsStation[]=[]

  //  loadSations():void{
  //   this.stationser.getAllStations().subscribe(
  //     (res:IsStation[])=>{ this.stationList=res
  //             console.log("results:", res);
              
  //     },
  // error=>{
  //         console.log(error);
          
  // }
  
   
}











