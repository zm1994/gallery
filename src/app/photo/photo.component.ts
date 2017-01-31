import { Component, Output, Input, OnChanges, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { Photo } from '../models/photo.model'
import { VkService } from '../services/vk_service/vk.service'


@Component({
  selector: 'photo',
  templateUrl: 'photo.component.html',
  styleUrls: ['photo.component.css'],
  providers: [VkService]
})

export class PhotoComponent {
  @ViewChild('photoContent')
  private photoContent: ElementRef;
  photoInfo: Photo;
  alertMessage: string;
  backwardFromPhotoInfo: EventEmitter<boolean>;

  constructor(private vkServ: VkService) {
    this.photoContent.nativeElement.hidden = true;
    this.backwardFromPhotoInfo = new EventEmitter<boolean>();
  }

  showPhotoInfo(photoId) {
    this.vkServ.vkGetPhotoById(photoId)
      .subscribe((response) => this.checkResponse(response),
      (error) => this.alertMessage = error)
  }

  checkResponse(resp) {
    console.log(resp)
    if (!resp.error)
      this.photoInfo = <Photo>resp.response.items[0];
    else
      this.alertMessage = resp.error.error_msg;
    console.log(this.photoInfo)
  }

  goBackFromPhotoContent() {
    this.photoContent.nativeElement.hidden = true;
    this.backwardFromPhotoInfo.emit(true)
  }
}
