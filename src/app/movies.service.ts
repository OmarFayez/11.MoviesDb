import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, debounceTime, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  media:BehaviorSubject<string>=new BehaviorSubject("")

  constructor(private _HttpClient:HttpClient) {
    this.getTvs().subscribe();
  }
   tvsSubject=new BehaviorSubject<any>('')

  tvs$:Observable<any>=this.tvsSubject.asObservable();

  private getTvs():Observable<any>
  {
    return this._HttpClient.get<any>(`https://api.themoviedb.org/3/trending/tv/day?api_key=f1aca93e54807386df3f6972a5c33b50&page=1`)
    .pipe(tap(response=>
      {
        this.tvsSubject.next(response)
      }))
  }
  getMedia(mediaType:string,page:number):Observable<any>
  {
    return this._HttpClient.get(`https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=f1aca93e54807386df3f6972a5c33b50&page=${page}`)
  }

  getMovieDetails(mediaType:string ,id:string):Observable<any>
  {
    return this._HttpClient.get(`https://api.themoviedb.org/3/${mediaType}/${id}?api_key=f1aca93e54807386df3f6972a5c33b50&language=en-US`)
  }
 
  getPersonWorks(id:string):Observable<any>
  {
    return this._HttpClient.get(` https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=f1aca93e54807386df3f6972a5c33b50`)
  }

  getSimilarWorks(mediaType:string,id:string):Observable<any>
  {
    return this._HttpClient.get(`https://api.themoviedb.org/3/${mediaType}/${id}/similar?api_key=f1aca93e54807386df3f6972a5c33b50`)
  }

  searchMedia(name:string,page:number):Observable<any>
  {
    return this._HttpClient.get(`https://api.themoviedb.org/3/search/movie?api_key=f1aca93e54807386df3f6972a5c33b50&query=${name}&page=${page}`)
  }

  saveMedia(searchTerm:string)
  {
    this.media.next(searchTerm)
  }

}
