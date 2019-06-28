import { Injectable } from '@angular/core';
// import { HttpModule } from '@angular/http';
// import { HttpClientModule} from '@angular/common/http';
import {  Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map'; 
// import { ObservableInput } from 'rxjs/Observable';
// import { ɵgetDOM as getDOM } from '@angular/platform-browser';

import {Video} from './video';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  private _getUrl = "/api/videos";
  private _postUrl = '/api/video';
  private _putUrl = '/api/video/';
  private _deleteUrl = '/api/video/'
  constructor(private _http : Http ) { }


  //GET Method
  getVideos () {
    return this._http.get(this._getUrl)
    .map((response :Response) => response.json())
  }

  //POST Method
  addVideo(video: Video) {
    let headers = new Headers({'content-type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this._http.post(this._postUrl, JSON.stringify(video), options)
    .map((response: Response) => response.json());
  }

  //PUT Method
  upDateVideo(video: Video) {
    let headers = new Headers({'content-type':'application/json'});
    let options = new RequestOptions({headers:headers});
    return this._http.put(this._putUrl + video._id, JSON.stringify(video), options)
    .map((response: Response) => response.json());
  }

  //DELETE Method
  deleetVideo (video: Video) {
    return this._http.delete(this._deleteUrl + video._id)
    .map((response :Response) => response.json());
  }
}
