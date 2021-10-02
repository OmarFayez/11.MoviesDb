import { Component, OnDestroy, OnInit,AfterViewInit } from '@angular/core';
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
  sub1:any;
  sub2:any;
  sub3:any;
  isLoading: boolean=true;
  anonymousImage:string="https://p0.piqsels.com/preview/375/145/317/person-human-mask-head.jpg"

  constructor(private _MoviesService:MoviesService) { }

  ngOnInit(): void {
    document.body.style.overflow="hidden"

    this.sub1=this._MoviesService.getMedia("movie",1).subscribe((response)=>{
      this.trendingMovies=response.results.slice(0,10)
      this.trendingMoviesList=response.results
    })
    this.sub2=this._MoviesService.getMedia("tv",1)
    this.sub3=this._MoviesService.getMedia("person",1).subscribe((response)=>{
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
  this.sub1.unsubscribe();
  this.sub3.unsubscribe();
 }

}
