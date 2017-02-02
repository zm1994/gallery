import { Component, OnInit, NgZone, Directive } from '@angular/core';
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
    private files: File[]
  //
  //
  // private zone: NgZone;
  // private options: Object;
  // private progress: number = 0;
  // private response: any = {};

  // public uploader:FileUploader;
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
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
    var formData: any = new FormData();
    var xhr = new XMLHttpRequest();
    for(var i = 0; i < this.files.length; i++) {
      formData.append(`file${i}`, this.files[i], this.files[i].name);
    }
    this.jsonp.options(this.serverUploadUrl)
      .map((res) =>  console.log(res.json()))
      .catch((error) => Observable.throw(error || 'Server error'))
    // this.jsonp.post(this.serverUploadUrl, {formData})
    //   .map((res) =>  console.log(res.json()))
    //   .catch((error) => Observable.throw(error || 'Server error'))
    // xhr.onreadystatechange = function () {
    //   if (xhr.readyState == 4) {
    //     if (xhr.status == 200) {
    //       console.log(JSON.parse(xhr.response));
    //     } else {
    //       console.log(xhr.response);
    //     }
    //   }
    // }
    //
    // xhr.open("POST", this.serverUploadUrl, true);
    // xhr.setRequestHeader('Access-Control-Allow-Origin', 'http://localhost:3000/');
    // xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    // xhr.withCredentials = true;
    // //xhr.upload = new XMLHttpRequestUpload()
    // // xhr.setRequestHeader('Access-Control-Allow-Origin', 'http://localhost:3000/')
    // // xhr.setRequestHeader('Access-Control-Request-Headers', 'accept, origin')
    // // xhr.setRequestHeader('Origin', 'http://localhost:3000/')
    // xhr.send(formData);
  }




//   uploadFile() {
//     // this.uploader.uploadAll();
//     let formData: FormData = new FormData(),
//       xhr: XMLHttpRequest = new XMLHttpRequest();
// this.uploader.queue.forEach((file) => {
//   formData.append()
// })
//     for (let i = 0; i < files.length; i++) {
//       formData.append("uploads[]", files[i], files[i].name);
//     }
//
//     xhr.onreadystatechange = () => {
//       if (xhr.readyState === 4) {
//         if (xhr.status === 200) {
//           observer.next(JSON.parse(xhr.response));
//           observer.complete();
//         } else {
//           observer.error(xhr.response);
//         }
//       }
//     };
//
//     xhr.upload.onprogress = (event) => {
//       this.progress = Math.round(event.loaded / event.total * 100);
//
//       this.progressObserver.next(this.progress);
//     };
//
//     xhr.open('POST', url, true);
//     xhr.send(formData);
//   }

  uploadShow(){
    // console.log(this.uploader)
  }
  //
  // ngOnInit() {
  //   this.vkServ.vkGetAlbums().subscribe((response) => this.checkAlbumsResponse(response),
  //             (error) => this.alertMessage = error)
  //   this.zone = new NgZone({ enableLongStackTrace: false });
  //   this.options = {
  //     url: this.serverUploadUrl,
  //     filterExtensions: true,
  //     allowedExtensions: ['image/png', 'image/jpg'],
  //     calculateSpeed: true,
  //     // data: {
  //     //   userId: 12,
  //     //   isAdmin: true
  //     // },
  //     // customHeaders: {
  //     //   'custom-header': 'value'
  //     // },
  //     // authToken: 'asd123b123zxc08234cxcv',
  //     // authTokenPrefix: 'Bearer'
  //   };
  // }
  //
  // handleUpload(data: any): void {
  //   this.zone.run(() => {
  //     this.response = data;
  //     this.progress = Math.floor(data.progress.percent / 100);
  //   });
  // }
    // private serverUploadUrl: string;
    //
    // constructor(private vkServ: VkService) {
    //     this.albums = []
    // }
    //
    // ngOnInit() {
    //     this.vkServ.vkGetAlbums().subscribe((response) => this.checkAlbumsResponse(response),
    //         (error) => this.alertMessage = error)
    // }
    //
    // imageUploaded(event) {
    //     console.log('finished')
    // }
    //
    // imageRemoved(event) {
    //     console.log('removed')
    // }
    //
    // disableSendButton(event) {
    //     console.log('removed')
    // }
    //
    //
    onSelectAlbum(albumId) {
        this.vkServ.vkGetPhotosUploadServer(albumId).subscribe((response) => this.checkUploadUrl(response),
            (error) => this.alertMessage = error)
    }

    checkUploadUrl(resp) {
        console.log(resp)
      if(!resp.error){
      let head = new Array<Header>()
      head.push(new Header('Access-Control-Allow-Origin', '*'))
        head.push(new Header('Origin', '*'))
            this.serverUploadUrl = resp.response.upload_url;
            // this.uploader = new FileUploader({
            //   url: this.serverUploadUrl,
            //   headers: head
            // });
            console.log(this.serverUploadUrl)
            // console.log(this.uploader);

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

class Header implements Headers{
  name: string;
  value: string;

  constructor(name, val) {
    this.name = name;
    this.value = val;
  }
}
