import { Component, Injectable, OnInit } from '@angular/core'
import { WindowRef } from '../window_reference.service'

declare var VK: any;

@Component({
    selector: 'vk_service',
    providers: [WindowRef]
})

@Injectable()
export class VkService implements OnInit{
    isLogged: boolean;
    client_id: number;
    login_access: number; // for access to photo by login set number 4

    constructor(private windRef: WindowRef) {
        this.isLogged = false;
        this.client_id = 5832573;
        this.login_access = 4;
    };

    ngOnInit() {
        
        VK.init({
            apiId: this.client_id,
        });
        VK.Auth.getLoginStatus(this.getVkStatus);
    }

    vkSearchPhoto(keyword: string){
       
        console.log('ku ku')
         console.log(this.windRef.nativeWindow)
         console.log(this.windRef.nativeWindow.VK)
        VK.api('photos.search', {"apiId": this.client_id, "q": keyword, "count": "10"}, (data) => {
            console.log(data);
        })
    }

    vkLogin() {
        console.log('login')
        console.log(this.windRef.nativeWindow)
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