import { Component, OnInit } from '@angular/core';

import {Video}  from './../video'
import {VideoService} from './../video.service'

@Component({
  selector: 'app-video-center',
  templateUrl: './video-center.component.html',
  styleUrls: ['./video-center.component.css'],
  providers: [VideoService]
})
export class VideoCenterComponent implements OnInit {

  // videos: Video[] = [
  //   {"_id": "1", "title":"Title1", "url":"Url1", "description":"Description1"},
  //   {"_id": "2", "title":"Title2", "url":"Url2", "description":"Description2"},
  //   {"_id": "3", "title":"Title3", "url":"Url3", "description":"Description3"},
  //   {"_id": "4", "title":"Title4", "url":"Url4", "description":"Description4"},
  //   {"_id": "5", "title":"Title5", "url":"Url5", "description":"Description5"},
  //   {"_id": "6", "title":"Title6", "url":"Url6", "description":"Description6"},
  // ]

  videos : Array<Video>

  selectedVideo: Video;
  private hidenewVideo : boolean = true;
  constructor( private _videoService : VideoService) { }

  ngOnInit() {
    this._videoService.getVideos()
    .subscribe(resVideoData => this.videos = resVideoData);
  }

  onSelectVideo (video: any) {
   this.selectedVideo = video;
   this.hidenewVideo = true;
   console.log(this.selectedVideo)
  }

  onSubmitAddVideo(video: Video) {
    console.log("ujehfuewhfuiwehfuiwehfuiew")
    this._videoService.addVideo(video)
    .subscribe(resNewVideo => {
      this.videos.push(resNewVideo);
      this.hidenewVideo = true;
      this.selectedVideo= resNewVideo;
    })
  }

  onUpdateVideoEvent (video :any) {
    this._videoService.upDateVideo(video)
     .subscribe(resUpdatedVideo => video = resUpdatedVideo)
     this.selectedVideo  = null;
  }

  onDeleteVideoEvent (video : any) {
    let videoArray = this.videos;
    this.
    _videoService.deleetVideo(video)
    .subscribe(resDeletedVideo =>  {
      for (let i=0; i < videoArray.length; i++){
        if(videoArray[i]._id === video._id) {
          videoArray.splice(i, 1);
        }
      }
    })
    this.selectedVideo = null;
  }

  newVideo (){
    this.hidenewVideo = false;
  }

}
