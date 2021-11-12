import {  Component, OnDestroy, OnInit } from '@angular/core';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit,OnDestroy {
  prefixSrc:string="https://image.tmdb.org/t/p/w400"
  anonymousImage:string="https://p0.piqsels.com/preview/375/145/317/person-human-mask-head.jpg"
  page:number=1;
  totalMovies:any;
  moviesList:any[]=[]
  isLoading: boolean=true;
  sub1:any;

  constructor(private _MoviesService:MoviesService) {
    console.log("movies constructor")

  }

  ngOnInit(): void {
    this.sub1=this._MoviesService.getMedia("movie",this.page).subscribe((response)=>{
      this.moviesList=response.results
      this.totalMovies=response.total_results
      this.isLoading=false
    })
  }

  nextPage(page:number)
  {
    this._MoviesService.getMedia("movie",page).subscribe((response)=>{
      this.moviesList=response.results
      this.totalMovies=response.total_results
  })}

  ngOnDestroy(): void {
    this.sub1.unsubscribe();
  }
 
}
