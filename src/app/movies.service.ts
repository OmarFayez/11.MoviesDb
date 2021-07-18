import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  media:any=new BehaviorSubject("notfound")
  constructor(private _HttpClient:HttpClient) { }
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
