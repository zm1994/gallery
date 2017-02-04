import { Component, Injectable, OnInit, AfterViewInit } from '@angular/core'
import { Observable } from 'rxjs/Observable';
import { Jsonp, Http } from "@angular/http";
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
    errorMessage: string;

    private get apiConfigRequest(){
        return '&v=5.62&need_covers=1&access_token=' + localStorage.getItem('sid')
                 + '?callback=JSONP_CALLBACK'
    }

    private get apiRootPathMethods(){
        return 'https://api.vk.com/method/'
    }

    constructor(private jsonp: Jsonp, private http: Http) {
        this.isLogged = false;
        this.login_access = 4;
    }

    ngOnInit() {
      console.log("start get login status on ng On Init")
      this.checkLoginStatus()
    }

    get sessionId() {
        return localStorage.getItem('sid')
    }

    get userId() {
      return localStorage.getItem('mid')
    }

    getUserInfo(callback) {
      // return this.http.request(this.apiRootPathMethods +'users.get?' +
      // '&user_ids=' + this.userId + this.apiConfigRequest)
      //   .map((res) => res.json())
      //   .catch((error) => Observable.throw(error || 'Server error')) //...errors i)
      VK.Api.call('users.get', { "user_ids":  this.userId }, callback)
      // return this.jsonp.request(this.apiRootPathMethods +'users.get?' +
      //   '&user_ids=' + this.userId + this.apiConfigRequest)
      //   .map((res) => res.json())
      //   .catch((error) => Observable.throw(error || 'Server error')) //...errors i
    }

  convertToObservable = (resp) => {
      return new Observable<any>().map(resp)
        .catch((error) => Observable.throw(error || 'Server error')) //...errors i
    }

    checkLoginStatus(){
        VK.Auth.getLoginStatus(this.getVkStatus);
    }

    ngAfterViewInit(){
        console.log("start get login status on ng On After Init")
        VK.Auth.getLoginStatus(this.getVkStatus);
    }

    vkGetPhotosUploadServer(albumId, callback) {
        VK.api("photos.getUploadServer", {"album_id": albumId}, callback);
        // return this.jsonp.request(this.apiRootPathMethods +'photos.getUploadServer?' +
        //     '&album_id=' + albumId + this.apiConfigRequest)
        //     .map((res) => res.json())
        //     .catch((error) => Observable.throw(error || 'Server error')) //...errors i
    }

    vkSearchPhoto(searchWord, offset, count, callback){
        VK.Api.call('photos.search', { 
            "q": searchWord,
            "offset": offset,
            "count": count
        }, callback)
        // return this.jsonp.request(this.apiRootPathMethods +'photos.search?' +
        //     'owner_id=' + this.userId + this.apiConfigRequest)
        //     .map((res) => res.json())
        //     .catch((error) => Observable.throw(error || 'Server error')) //...errors i
    }

    vkGetAlbums(callback) {
        // return this.jsonp.request(this.apiRootPathMethods + 'photos.getAlbums?' +
        //     'owner_id=' + this.userId + this.apiConfigRequest)
        //     .map((res) =>  res.json())
        //     .catch((error) => Observable.throw(error || 'Server error')) //...errors i
      VK.Api.call('photos.getAlbums', { "owner_id":  this.userId }, callback)
    }

    vkGetPhotosInAlbum(albumId, callback) {
        VK.Api.call('photos.get', { 
            "owner_id":  this.userId,
            "album_id": albumId
        }, callback)
        // return this.jsonp.request('https://api.vk.com/method/photos.get?' +
        //     'owner_id=' + this.userId +
        //     '&album_id=' + albomId + this.apiConfigRequest)
        //     .map((res) =>  res.json())
        //     .catch((error) => Observable.throw(error || 'Server error'))
    }

    vkGetPhotoById(idPhoto, callback) {
        VK.Api.call('photos.getById', { "photos":  this.userId + '_' + idPhoto }, callback)
        // return this.jsonp.request('https://api.vk.com/method/photos.getById?' +
        //     '&photos=' + this.userId + '_' + idPhoto +
        //      +'&extended=1' + this.apiConfigRequest)
        //     .map((res) =>  res.json())
        //     .catch((error) => Observable.throw(error || 'Server error'))
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
            // location.reload();
        } else {
            this.errorMessage = "User is not enable"
            this.isLogged = false;
            localStorage.removeItem("sid");
            localStorage.removeItem("mid");
        }
    }
}
