import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from '../movies.service';
import { OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-moviedetails',
  templateUrl: './moviedetails.component.html',
  styleUrls: ['./moviedetails.component.scss']
})
export class MoviedetailsComponent implements OnInit,OnDestroy {
  id:string=""
  type:string=""
  movieDetails:any={}
  works:any=[]
  imgPrefix:string="https://image.tmdb.org/t/p/w400"
  imgPrefix2:string="https://image.tmdb.org/t/p/w200"
  anonymousImage:string="https://p0.piqsels.com/preview/375/145/317/person-human-mask-head.jpg"
  isLoading: boolean=true;
  sub1:any;
  
  customOptions: OwlOptions = {
    autoplay:true,
    autoplaySpeed:500,
    autoplayHoverPause:true,
    autoplayTimeout:4000,
    center:true,
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    margin:5,
    dots: false,
    navSpeed: 500,
    navText: ['', ''],
    responsive: {
      0: {
        items: 2
      },
      576: {
        items: 4
      },
      768: {
        items: 6
      },
      992: {
        items: 8
      }
    },
    nav: true
  }
  constructor(private _ActivatedRoute:ActivatedRoute ,private _MoviesService:MoviesService,private _Router:Router) {}



  ngOnInit(): void {

    document.body.style.overflow="hidden"
    this.id=this._ActivatedRoute.snapshot.params.id
    this.type=this._ActivatedRoute.snapshot.params.type
    if(this.type=="movie")
    {
      this.sub1=this._MoviesService.getMovieDetails("movie",this.id).subscribe((data)=>{
        this.movieDetails=data
        this.isLoading=false
        document.body.style.overflow="auto"
      })
      this._MoviesService.getSimilarWorks("movie",this.id).subscribe((data)=>{
        this.works=data?.results
      })
    }
    else if(this.type=="tv")
    {
      this.sub1=this._MoviesService.getMovieDetails("tv",this.id).subscribe((data)=>{
        this.movieDetails=data
        this.isLoading=false
        document.body.style.overflow="auto"
      })
      this._MoviesService.getSimilarWorks("tv",this.id).subscribe((data)=>{
        this.works=data?.results
      })
    }
    else if(this.type=="person")
    {
      this.sub1=this._MoviesService.getMovieDetails("person",this.id).subscribe((data)=>{
        this.movieDetails=data
        this.isLoading=false
        document.body.style.overflow="auto"
      })

      this._MoviesService.getPersonWorks(this.id).subscribe((data)=>{
        this.works=data?.cast
      })
    }
    
   
  }
  reload(media_type:string,id:number)
  {
    if(media_type!=null)
    {
      this._Router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
        this._Router.navigate(['/moviedetails',media_type,id]);
    }); 
    }
    else if(this.type=="movie")
    {
      this._Router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
        this._Router.navigate(['/moviedetails',"movie",id]);
    }); 
    }
    else if(this.type=="tv")
    {
      this._Router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
        this._Router.navigate(['/moviedetails',"tv",id]);
    }); 
    }
 
  }
  ngOnDestroy(): void {
    this.sub1.unsubscribe();
  }

}
