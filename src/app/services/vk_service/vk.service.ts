import { Component, Injectable, OnInit } from '@angular/core'
import { Observable } from 'rxjs/Observable'
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

    constructor() {
        this.isLogged = false;
        this.login_access = 4;
    };

    private get userId(){
      return localStorage.getItem('mid')
    }

    ngOnInit() {
        VK.Auth.getLoginStatus(this.getVkStatus);
    }

    vkSearchPhoto(params, callbackMethod){
        VK.Api.call('photos.search', params, callbackMethod)
    }

    vkGetAlboms(callbackMethod){
        let data = {
          "owner_id": this.userId
        }
        console.log(data)

        VK.api('photos.getAlbums', data, callbackMethod)
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
