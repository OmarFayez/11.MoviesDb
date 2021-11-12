import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-tv',
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.scss']
})
export class TvComponent implements OnInit,OnDestroy {
  constructor(private _MoviesService:MoviesService) { }

  _unsubscribe:Subject<boolean>=new Subject();

  prefixSrc:string="https://image.tmdb.org/t/p/w200"
  anonymousImage:string="https://p0.piqsels.com/preview/375/145/317/person-human-mask-head.jpg"
  page:number=1;
  totaltv:any;
  tvList:any[]=[]
  isLoading: boolean=true;
 
  ngOnInit(): void {
    this._MoviesService.getMedia("tv",this.page).pipe(takeUntil(this._unsubscribe)).subscribe((response)=>{
      this.tvList=response.results
      this.totaltv=response.total_results
      this.isLoading=false
    })
  }

  nextPage(page:number)
  {
    this._MoviesService.getMedia("tv",page).pipe(takeUntil(this._unsubscribe)).subscribe((response)=>{
      this.tvList=response.results
      this.totaltv=response.total_results
    })
  }

  ngOnDestroy(): void {
    this._unsubscribe.next(true)
    this._unsubscribe.complete()
  }
}
