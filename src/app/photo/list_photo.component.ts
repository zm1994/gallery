import { Component, Output, EventEmitter } from '@angular/core';
import { Photo } from '../models/photo.model'
import { VkService } from '../services/vk_service/vk.service'
import {ANGULAR_TABS_DIRECTIVES, TabInterface} from "angular2-tabs/core";
import {isUndefined} from "util";

@Component({
    selector: 'list-photo',
    templateUrl: 'list_photo.component.html',
    styleUrls: ['list_photo.component.css'],
    providers: [VkService]
})

export class ListPhotoComponent {
    @Output() closeListPhoto: EventEmitter<boolean>;
    arrPhoto: Photo[]
    alertMessage: string;

    constructor( private vkServ: VkService ) {
      this.arrPhoto = [];
      this.alertMessage = ''
      this.closeListPhoto = new EventEmitter();
    }

    getAllPhotoInAlbum(albumId) {
        this.clearArrayPhoto()
        this.vkServ.vkGetPhotoInAlbom(albumId)
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

    checkResponse(resp) {
        console.log(resp)
        if (!resp.error)
          this.arrPhoto = this.arrPhoto.concat(<Photo[]>resp.response.items);
        else
          this.alertMessage = resp.error.error_msg;
        console.log(this.arrPhoto)
    }
}
