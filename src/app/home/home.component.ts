import { Component, OnDestroy, OnInit,AfterViewInit } from '@angular/core';

import { map ,tap} from 'rxjs/operators';
import { MoviesService } from '../movies.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
  movies$=this._MoviesService.getMedia("movie",1).pipe(tap(data=> this.trendingMoviesList=data.results),map(data=> data.results.slice(0,10)))

  tv$=this._MoviesService.getMedia("tv",2).pipe(map(data=> data.results.slice(0,10)))

  people$=this._MoviesService.getMedia("person",1).pipe(map(data=>data.results.slice(0,10)))

  trendingMoviesList:any[]=[];

  prefixSrc:string="https://image.tmdb.org/t/p/w200"

  anonymousImage:string="https://p0.piqsels.com/preview/375/145/317/person-human-mask-head.jpg"

  type:string[]=["movie","tv","person"]

  isLoading: boolean=true;

  constructor(private _MoviesService:MoviesService) { 
  }

  ngAfterViewInit() {
    setTimeout(()=>{ this.isLoading=false;},0)}

}
