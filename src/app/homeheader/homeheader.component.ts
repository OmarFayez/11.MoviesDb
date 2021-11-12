import { Component, Input, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-homeheader',
  templateUrl: './homeheader.component.html',
  styleUrls: ['./homeheader.component.scss']
})
export class HomeheaderComponent implements OnInit {

  constructor() { }

  @Input() trendingMovies:any[]=[]
  prefixSrc="https://image.tmdb.org/t/p/w200/"
  anonymousImage:string="https://p0.piqsels.com/preview/375/145/317/person-human-mask-head.jpg"

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


  ngOnInit(): void {
  }

}
