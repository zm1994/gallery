import { Component, Input, OnChanges, HostListener, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { VkService } from '../services/vk_service/vk.service'
import { ScrollListener } from '../shared/scroll.listener'
import { ListPhotoComponent } from '../photo/list_photo.component'
import { Album } from '../models/album.model'
import 'rxjs/add/operator/map'

@Component({
    selector: 'image-uploader',
    templateUrl: 'image_uploader.component.html',
    styleUrls: ['image_uploader.component.css'],
    providers: [VkService]
})

export class ImageUploaderComponent implements OnInit {
    private alertMessage: string;
    private albums: Album[];
    private serverUploadUrl: string;

    constructor(private vkServ: VkService) {
        this.albums = []
    }

    ngOnInit() {
        this.vkServ.vkGetAlbums().subscribe((response) => this.checkAlbumsResponse(response),
            (error) => this.alertMessage = error)
    }

    imageUploaded(event) {
        console.log('finished')
    }

    imageRemoved(event) {
        console.log('removed')
    }

    disableSendButton(event) {
        console.log('removed')
    }


    onSelectAlbum(albumId) {
        this.vkServ.vkGetPhotosUploadServer(albumId).subscribe((response) => this.checkUploadUrl(response),
            (error) => this.alertMessage = error)
    }

    checkUploadUrl(resp) {
        console.log(resp)
        if(!resp.error){
            this.serverUploadUrl = resp.response.upload_url;
            console.log(this.serverUploadUrl)
        }
        else
            this.alertMessage = resp.error.error_msg;
    }

    checkAlbumsResponse(resp) {
        if(!resp.error)
            this.albums = <Album[]> resp.response.items;
        else
            this.alertMessage = resp.error.error_msg;
    }
}