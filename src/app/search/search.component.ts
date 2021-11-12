import { Component, OnDestroy, OnInit } from '@angular/core';

import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit,OnDestroy {
error:string=""
searchTerm:string=""
page:number=1;
totalMovies:any;
movies:any;
prefixSrc:string="https://image.tmdb.org/t/p/w400"
anonymousImage:string="https://p0.piqsels.com/preview/375/145/317/person-human-mask-head.jpg"
isLoading: boolean=true;
subscribtion:any;

  constructor(private _MoviesService:MoviesService) {}

   ngOnInit(): void {
    document.body.style.overflow="hidden"
    this._MoviesService.media.subscribe(()=>
    {
      this.searchTerm=this._MoviesService.media.getValue()
      this.subscribtion=this._MoviesService.searchMedia(this.searchTerm,this.page).subscribe((response)=>
      {
        if(response.results.length=="0")
        {
          this.error="No Movies Match Your Search :"
          this.isLoading=false
          document.body.style.overflow="auto"
          if(this.searchTerm=="notfound")
          {
            this.searchTerm=""
          }
        }
        else
        {
          this.movies=response.results
          this.totalMovies=response.total_results
          this.error=""
          this.isLoading=false
          document.body.style.overflow="auto"
        }
      })
    })
  }

   nextPage(page:number)
   {
       this.isLoading=true
       document.body.style.overflow="hidden"
      this._MoviesService.searchMedia(this.searchTerm,page).subscribe((response)=>{
       this.movies=response.results
       this.totalMovies=response.total_results
       this.isLoading=false
       document.body.style.overflow="auto"
   })}

   ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }
}
