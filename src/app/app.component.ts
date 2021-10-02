import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { Location, PopStateEvent } from "@angular/common";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
<<<<<<< HEAD
  title = 'Cinema Site';
=======
    title = 'Cinema Site';
>>>>>>> 48d4b8a5686c082e3a8bbe94a19a57e7c5020db8
  private lastPoppedUrl: any;
    private yScrollStack: any[] = [];
  constructor(private router:Router, private location: Location){
  }
  ngOnInit(): void {
    this.location.subscribe((ev:PopStateEvent) => {
      this.lastPoppedUrl = ev.url;});
      
  this.router.events.subscribe((ev:any) => {
      if (ev instanceof NavigationStart) {
          if (ev.url != this.lastPoppedUrl)
              this.yScrollStack.push(window.scrollY);
      } else if (ev instanceof NavigationEnd) {
          if (ev.url == this.lastPoppedUrl) {
              this.lastPoppedUrl = undefined;
              window.scrollTo(0, this.yScrollStack.pop());
          } else
              window.scrollTo(0, 0);
      }
  });
  }

}

