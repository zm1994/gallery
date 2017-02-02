import { Component, Injectable, OnInit, AfterViewInit } from '@angular/core'
import { Observable } from 'rxjs/Observable';
import { Jsonp, URLSearchParams, RequestOptions, RequestOptionsArgs } from "@angular/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Image } from '../../models/image.model'
import { Album } from '../../models/album.model'
import { Photo } from '../../models/photo.model'

declare var VK: any;

@Component({
    selector: 'vk_service'
})

@Injectable()
export class VkService implements OnInit, AfterViewInit{
    isLogged: boolean;
    login_access: number; // for access to photo by login set number 4

    private get apiConfigRequest(){
        return '&v=5.62&need_covers=1&access_token=' + localStorage.getItem('sid') +
                '&callback=JSONP_CALLBACK'
    }

    private get apiRootPathMethods(){
        return 'https://api.vk.com/method/'
    }

    constructor(private jsonp: Jsonp) {
        this.isLogged = false;
        this.login_access = 4;
    }

    ngOnInit() {
      console.log("start get login status on ng On Init")
      this.checkLoginStatus()
    }

    get userId() {
      return localStorage.getItem('mid')
    }

    getUserInfo() {
      return this.jsonp.request(this.apiRootPathMethods +'users.get?' +
        '&user_ids=' + this.userId + this.apiConfigRequest)
        .map((res) => res.json())
        .catch((error) => Observable.throw(error || 'Server error')) //...errors i
    }

    checkLoginStatus(){
        VK.Auth.getLoginStatus(this.getVkStatus);
    }

    ngAfterViewInit(){
        console.log("start get login status on ng On After Init")
        VK.Auth.getLoginStatus(this.getVkStatus);
    }

    vkGetPhotosUploadServer(albumId) {
        return this.jsonp.request(this.apiRootPathMethods +'photos.getUploadServer?' +
            '&album_id=' + albumId + this.apiConfigRequest)
            .map((res) => res.json())
            .catch((error) => Observable.throw(error || 'Server error')) //...errors i
    }

    vkSearchPhoto(searchWord, offset, count): Observable<any[]>{
        return this.jsonp.request(this.apiRootPathMethods +'photos.search?' +
            'owner_id=' + this.userId + this.apiConfigRequest)
            .map((res) => res.json())
            .catch((error) => Observable.throw(error || 'Server error')) //...errors i
    }

    vkGetAlbums(): Observable<any[]>{
        return this.jsonp.request(this.apiRootPathMethods + 'photos.getAlbums?' +
            'owner_id=' + this.userId + this.apiConfigRequest)
            .map((res) =>  res.json())
            .catch((error) => Observable.throw(error || 'Server error')) //...errors i
    }

    vkGetPhotosInAlbum(albomId): Observable<Photo[]> {
        return this.jsonp.request('https://api.vk.com/method/photos.get?' +
            'owner_id=' + this.userId +
            '&album_id=' + albomId + this.apiConfigRequest)
            .map((res) =>  res.json())
            .catch((error) => Observable.throw(error || 'Server error'))
    }

    vkGetPhotoById(idPhoto) {
        return this.jsonp.request('https://api.vk.com/method/photos.getById?' +
            '&photos=' + this.userId + '_' + idPhoto +
             +'&extended=1' + this.apiConfigRequest)
            .map((res) =>  res.json())
            .catch((error) => Observable.throw(error || 'Server error'))
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
            this.isLogged = false;
        } else {
            console.log('no response');
        }
    }

    getVkStatus = (response) => {
        console.log(response)
        console.log(this)
        console.log(VK)
        if (response.session) {
            this.isLogged = true;
            localStorage.setItem("sid", response.session.sid);
            localStorage.setItem("mid", response.session.mid);
        } else {
            this.isLogged = false;
        }
    }
}
