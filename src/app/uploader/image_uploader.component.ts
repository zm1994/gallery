import { Component, OnInit, NgZone, Directive, ViewChild, ElementRef } from '@angular/core';
import { VkService } from '../services/vk_service/vk.service'
import { ListPhotoComponent } from '../photo/list_photo.component'
import { Observable } from 'rxjs/Observable';
// import { FileUploader } from 'ng2-file-upload';
import { Album } from '../models/album.model'
import 'rxjs/add/operator/map'
import 'rxjs/Observable'
//import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import {Headers} from "ng2-file-upload";
import { Jsonp } from '@angular/http'

@Component({
    selector: 'image-uploader',
    templateUrl: 'image_uploader.component.html',
    styleUrls: ['image_uploader.component.css'],
    providers: [VkService]
})

@Directive({ selector: '[ng2FileSelect]' })
@Directive({ selector: '[ng2FileDrop]' })



export class ImageUploaderComponent implements OnInit {
    private alertMessage: string;
    private albums: Album[];
    private serverUploadUrl: string;
    @ViewChild('uploader')
    private uploader: ElementRef;
    files: File[] = [];

    fileChanged(event) {
    console.log(event.target.files);
    this.files = event.target.files
    console.log(this.files)
  }

    constructor(private vkServ: VkService, private jsonp: Jsonp) {
        this.albums = []
    }

  ngOnInit() {
      this.vkServ.vkGetAlbums().subscribe((response) => this.checkAlbumsResponse(response),
                (error) => this.alertMessage = error)

  }

  onChange(event) {
    //var files = event.srcElement.files;
    //console.log(files);
    this.files = <File[]> event.srcElement.files;
    console.log(this.files);
  }

  uploadFile() {
    // this.uploader.uploadAll();
    let formData = new FormData();
      let xhr  = new XMLHttpRequest();
        for (let file of this.files) {
            formData.append("photos_list", file, file.name)
        }
        
        //this.jsonp.post(this.serverUploadUrl, formData ).subscribe(res => console.log(res))
        
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    console.log(JSON.parse(xhr.response))
                } else {
                    console.log(xhr.response)
                }
            }
        }
        xhr.open("POST", this.serverUploadUrl, true)
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*')
        //xhr.setRequestHeader('Origin', 'http://localhost:3000')
        xhr.send(formData)
  }
  

  uploadShow(){
    // console.log(this.uploader)
  }
  
  onSelectAlbum(albumId) {
        // this.vkServ.vkGetPhotosUploadServer(albumId).subscribe((response) => this.checkUploadUrl(response),
        //     (error) => this.alertMessage = error)
        console.log(VK)
            VK.api("photos.getUploadServer", {"album_id": albumId}, function (data) {
          console.log(data)    
          console.log(VK.Api.createRequest("POST", data.response.upload_url))
        });
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
