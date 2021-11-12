import { Component, OnDestroy, OnInit, AfterContentInit } from '@angular/core';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit,OnDestroy,AfterContentInit {

  prefixSrc:string="https://image.tmdb.org/t/p/w400"
  anonymousImage:string="https://p0.piqsels.com/preview/375/145/317/person-human-mask-head.jpg"
  page:number=1;
  totalPeople:any;
  peopleList:any[]=[]
  isLoading: boolean=true;
  sub1:any;
  sub2:any;

  constructor(private _MoviesService:MoviesService) { }


  ngOnInit(): void {

     this.sub1=this. _MoviesService.getMedia("person",this.page).subscribe((response)=>{
      this.peopleList=response.results
      this.totalPeople=response.total_results
      this.isLoading=false
    })
  }

  nextPage(page:number)
  {
      this._MoviesService.getMedia("person",page).subscribe((response)=>{
      this.peopleList=response.results
      this.totalPeople=response.total_results
  })}

  ngAfterContentInit(): void {}
  ngOnDestroy(): void {
    this.sub1.unsubscribe();
  }

}
