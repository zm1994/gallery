import { Component, Output, Input, EventEmitter, 
  ElementRef, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Photo } from '../models/photo.model'
import { VkService } from '../services/vk_service/vk.service'


@Component({
  selector: 'photo',
  templateUrl: 'photo.component.html',
  styleUrls: ['photo.component.css'],
  providers: [VkService]
})

export class PhotoComponent implements AfterViewInit {
  @Output() backwardFromPhotoInfo: EventEmitter<boolean>;
  @ViewChild('photoContent')
  private photoContent: ElementRef;
  photoInfo: Photo;
  alertMessage: string;

  constructor(private vkServ: VkService, private ref: ChangeDetectorRef) {
    this.backwardFromPhotoInfo = new EventEmitter<boolean>();
  }

  ngAfterViewInit() {
    console.log(this.photoContent)
    this.hidePhotoContent()
  }

  showPhotoContent() {
    this.photoContent.nativeElement.hidden = false;
  }

  hidePhotoContent() {
    this.photoContent.nativeElement.hidden = true;
  }

  showPhotoInfo(photoId) {
    console.log(photoId)
    this.vkServ.vkGetPhotoById(photoId, this.checkResponse)
    // this.vkServ.vkGetPhotoById(photoId)
    //   .subscribe((response) => this.checkResponse(response),
    //   (error) => this.alertMessage = error)
  }

  checkResponse = (resp) => {
    console.log(resp)
    if (!resp.error){
      console.log(this.photoContent)
      this.photoInfo = <Photo>resp.response[0];
      console.log(this.photoInfo)
      this.showPhotoContent();
      
    }
    else {
      console.log("error")
      this.alertMessage = resp.error.error_msg;
    }
    this.ref.detectChanges();
    console.log(this.photoInfo)
  }

  goBackFromPhotoContent() {
   this.backwardFromPhotoInfo.emit(true);
   this.hidePhotoContent()
  }
}
