import { Component, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Photo } from '../models/photo.model'
import { VkService } from '../services/vk_service/vk.service'
import { ANGULAR_TABS_DIRECTIVES, TabInterface } from "angular2-tabs/core";
import { PhotoComponent } from '../photo/photo.component'

@Component({
  selector: 'list-photo',
  templateUrl: 'list_photo.component.html',
  styleUrls: ['list_photo.component.css'],
  providers: [VkService]
})

export class ListPhotoComponent implements AfterViewInit {
  arrPhoto: Photo[]
  alertMessage: string;
  @ViewChild(PhotoComponent)
  private photoInfoContent: PhotoComponent;
  @ViewChild('listPhotoContent')
  private listPhotoContent: ElementRef;
  @Output() backwardFromAlbum: EventEmitter<boolean>;

  constructor(private vkServ: VkService, private ref: ChangeDetectorRef) {
    this.arrPhoto = [];
    this.alertMessage = ''
    this.backwardFromAlbum = new EventEmitter<boolean>();
  }

  ngAfterViewInit() {
    this.hideListPhotoContent()
  }

  showListPhotoContent() {
    this.listPhotoContent.nativeElement.hidden = false;
  }

  hideListPhotoContent() {
    this.listPhotoContent.nativeElement.hidden = true;
  }

  getAllPhotoInAlbum(albumId) {
    this.clearArrayPhoto()
    this.vkServ.vkGetPhotosInAlbum(albumId, this.checkResponse)
  }

  getAllPhotoByParams(word, offset, count) {
    this.vkServ.vkSearchPhoto(word, offset, count, this.checkResponse)
  }

  clearArrayPhoto() {
    this.arrPhoto = []
  }

  showPhotoInfoContent(photo: Photo) {
    this.hideListPhotoContent();
    this.photoInfoContent.showPhotoInfo(photo.pid);
  }

  goBackFromAlbumContent() {
    this.hideListPhotoContent();
    this.backwardFromAlbum.emit(true)
  }

  onBackwardFromPhotoInfo(event) {
    this.showListPhotoContent();
  }

  checkResponse = (resp) => {
    if (!resp.error) {
      this.arrPhoto = this.arrPhoto.concat(<Photo[]>resp.response);
      this.showListPhotoContent();
      this.ref.detectChanges();
    }
    else
      this.alertMessage = resp.error.error_msg;
  }
}
