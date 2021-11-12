import {  Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit,OnDestroy {
  constructor(private _MoviesService:MoviesService) {
  }

  _unsubscribe:Subject<boolean>=new Subject();

  prefixSrc:string="https://image.tmdb.org/t/p/w200"
  anonymousImage:string="https://p0.piqsels.com/preview/375/145/317/person-human-mask-head.jpg"
  page:number=1;
  totalMovies:any;
  moviesList:any[]=[]
  isLoading: boolean=true;


  ngOnInit(): void {
      this._MoviesService.getMedia("movie",this.page).pipe(takeUntil(this._unsubscribe)).subscribe((response)=>{
      this.moviesList=response.results
      this.totalMovies=response.total_results
      this.isLoading=false
    })
  }

  nextPage(page:number)
  {
    this._MoviesService.getMedia("movie",page).pipe(takeUntil(this._unsubscribe)).subscribe((response)=>{
      this.moviesList=response.results
      this.totalMovies=response.total_results
  })}

  ngOnDestroy(): void {
    this._unsubscribe.next(true)
    this._unsubscribe.complete()
  }
 
}
