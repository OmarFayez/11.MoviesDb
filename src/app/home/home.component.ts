import { Component, OnDestroy, OnInit,AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MoviesService } from '../movies.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit  ,OnDestroy ,AfterViewInit {
  trendingMoviesList:any[]=[];

  prefixSrc:string="https://image.tmdb.org/t/p/w400"
  trendingMovies:any[]=[]
  trendingTv:any[]=[]
  trendingPerson:any[]=[]
  type:string[]=["movie","tv","person"]
  moviesSubscription:any;
  tvSubscription:Observable<any>;
  peopleSubscription:any;
  isLoading: boolean=true;
  anonymousImage:string="https://p0.piqsels.com/preview/375/145/317/person-human-mask-head.jpg"

  constructor(private _MoviesService:MoviesService) { 
    this.tvSubscription=this._MoviesService.getMedia("tv",1)
  }

  ngOnInit(): void {
    document.body.style.overflow="hidden"

    this.moviesSubscription=this._MoviesService.getMedia("movie",1).subscribe((response)=>{
      this.trendingMovies=response.results.slice(0,10)
      this.trendingMoviesList=response.results
    })
    
    this.peopleSubscription=this._MoviesService.getMedia("person",1).subscribe((response)=>{
      this.trendingPerson=response.results.slice(0,10)
    })
  }

  ngAfterViewInit() {
    setTimeout(()=>{ 
       this.isLoading=false;
      document.body.style.overflow="auto";
    },0)
    }

ngOnDestroy(): void {
  this.moviesSubscription.unsubscribe();
  this.peopleSubscription.unsubscribe();
 }

}
