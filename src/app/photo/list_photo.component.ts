import { Component, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Photo } from '../models/photo.model'
import { VkService } from '../services/vk_service/vk.service'
import {ANGULAR_TABS_DIRECTIVES, TabInterface} from "angular2-tabs/core";
import { PhotoComponent } from '../photo/photo.component'

@Component({
    selector: 'list-photo',
    templateUrl: 'list_photo.component.html',
    styleUrls: ['list_photo.component.css'],
    providers: [VkService]
})

export class ListPhotoComponent {
    arrPhoto: Photo[]
    alertMessage: string;
    @ViewChild(PhotoComponent)
    private photoContent: PhotoComponent;
    @ViewChild('listPhotoContent')
    private listPhotoContent: ElementRef;

    constructor( private vkServ: VkService ) {
      this.arrPhoto = [];
      this.alertMessage = ''
    }

    getAllPhotoInAlbum(albumId) {
        this.clearArrayPhoto()
        this.vkServ.vkGetPhotosInAlbum(albumId)
            .subscribe((response) => this.checkResponse(response),
                 (error) => this.alertMessage = error)
    }

    getAllPhotoByParams(word, offset, count) {
        this.vkServ.vkSearchPhoto(word, offset, count)
            .subscribe((response) => this.checkResponse(response),
                       (error) =>  this.alertMessage = error)
    }

    clearArrayPhoto(){
        this.arrPhoto = []
    }

    showPhotoInfoContent(photo: Photo) {
        this.listPhotoContent.nativeElement.hidden = true;
        this.photoContent.showPhotoInfo(photo.id);
    }

    onBackwardFromPhotoInfo(event) {
        this.listPhotoContent.nativeElement.hidden = true;
    }

    checkResponse(resp) {
        console.log(resp)
        if (!resp.error)
          this.arrPhoto = this.arrPhoto.concat(<Photo[]>resp.response.items);
        else
          this.alertMessage = resp.error.error_msg;
        console.log(this.arrPhoto)
    }
}
