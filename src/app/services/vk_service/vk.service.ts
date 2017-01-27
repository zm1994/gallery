import { Component, Injectable, OnInit } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { Jsonp } from "@angular/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Image } from '../../models/image.model'

declare var VK: any;

@Component({
    selector: 'vk_service'
})

@Injectable()
export class VkService implements OnInit{
    isLogged: boolean;
    login_access: number; // for access to photo by login set number 4

    constructor(private jsonp: Jsonp) {
        this.isLogged = false;
        this.login_access = 4;
    };

    get userId(){
      return localStorage.getItem('mid')
    }

    ngOnInit() {
        VK.Auth.getLoginStatus(this.getVkStatus);
    }

    vkSearchPhoto(searchWord, offset, countSearchPhoto, callbackMethod){
        let data = {
            "q": searchWord,
            "offset": offset,
            "count": countSearchPhoto
        }
        VK.Api.call('photos.search', data, callbackMethod)
    }

    vkGetAlbums(): Observable<any[]>{
        // let data = {
        //   "owner_id": this.userId
        // }
        // console.log(data)
        // VK.Api.call('photos.getAlbums', data, callbackMethod)
      return this.jsonp.request('https://api.vk.com/method/photos.getAlbums?' +
        'owner_id=' + localStorage.getItem('mid') +
        '&v=5.52' +
        '&need_covers=1' +
        '&access_token=' + localStorage.getItem('sid') +
        '&callback=JSONP_CALLBACK').map((res) =>
        {
          let r = res.json();
          console.log(res.json());
          return <any[]> r.response.items
        }
        )
    }

    vkGetPhotoById(idAlbum, idPhoto, callbackMethod) {
        let data = {
            "owner_id": this.userId,
            "album_id": idAlbum,
            "photo_ids": idPhoto
        }
        VK.Api.call('photos.get', data, callbackMethod)
    }

    vkGetAllPhotoFromAlbom(idAlbum, idPhoto, callbackMethod) {
        let data = {
            "owner_id": this.userId,
            "album_id": idAlbum,
            "photo_ids": idPhoto
        }
        VK.Api.call('photos.get', data, callbackMethod)
    }

    vkLogin() {
        VK.Auth.login(this.getVkStatus, this.login_access);
    };

    vkLogOut() {
        VK.Auth.logout(this.logOutReload);
    };

    logOutReload = (response) => {
        if (response) {
            localStorage.removeItem("sid");
            localStorage.removeItem("mid");
            location.replace(window.location.origin);
        } else {
            console.log('no response');
        }
    }

    getVkStatus = (response) => {
        if (response.session) {
            this.isLogged = true;
            localStorage.setItem("sid", response.session.sid);
            localStorage.setItem("mid", response.session.mid);
        } else {
            this.isLogged = false;
        }
    }
}
