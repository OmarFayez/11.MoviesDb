import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit,OnDestroy {
  constructor(private _MoviesService:MoviesService) {}

  _unsubscribe:Subject<boolean>=new Subject();

  error:string=""
  searchTerm:string=""
  page:number=1;
  totalMovies:any;
  movies:any;
  prefixSrc:string="https://image.tmdb.org/t/p/w200"
  anonymousImage:string="https://p0.piqsels.com/preview/375/145/317/person-human-mask-head.jpg"
  isLoading: boolean=true;

   ngOnInit(): void {

    this._MoviesService.media.pipe(debounceTime(500),distinctUntilChanged()).pipe(takeUntil(this._unsubscribe)).subscribe(()=>
    {
      this.searchTerm=this._MoviesService.media.getValue()
     this._MoviesService.searchMedia(this.searchTerm,this.page).pipe(takeUntil(this._unsubscribe)).subscribe((response)=>
      {
        if(response.results.length=="0")
        {
          this.error="No Movies Match Your Search :"
          this.isLoading=false
          this.movies=[]
        }
        else
        {
          this.movies=response.results
          this.totalMovies=response.total_results
          this.error=""
          this.isLoading=false
        }
      })
    })
  }

   nextPage(page:number)
   {
       this.isLoading=true
      this._MoviesService.searchMedia(this.searchTerm,page).pipe(takeUntil(this._unsubscribe)).subscribe((response)=>{
       this.movies=response.results
       this.totalMovies=response.total_results
       this.isLoading=false
   })}

   ngOnDestroy(): void {
    this._unsubscribe.next(true)
    this._unsubscribe.complete()
  }
}
