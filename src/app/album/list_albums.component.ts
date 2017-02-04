import {Component, ChangeDetectorRef, ViewChild, AfterViewInit, ElementRef, OnInit} from '@angular/core';
import { VkService } from '../services/vk_service/vk.service'
import { Album } from '../models/album.model'
import { Photo } from '../models/photo.model'
import { ListPhotoComponent } from '../photo/list_photo.component'
import { AlbumComponent } from '../album/album.component'
import { User } from '../models/user.model'

@Component({
  selector: 'list-albums',
  templateUrl: 'list_albums.component.html',
  styleUrls: ['list_albums.component.css'],
  providers: [VkService]
})


export class ListAlbumComponent implements AfterViewInit, OnInit {
  // @ViewChild('albumContent')
  // private albumContent: AlbumComponent;
  currentUser: User;

  @ViewChild('listPhotoContent')
  private listPhotoContent: ListPhotoComponent;

  @ViewChild('arrayAlbumContent')
  private arrayAlbumContent: ElementRef;
  private arrayAlbums: Album[];
  private alertMessage: string;

  constructor(private vkServ: VkService, private ref: ChangeDetectorRef){
    this.arrayAlbums = [];
    this.alertMessage = ''
  }

  ngOnInit() {
    // this.vkServ.getUserInfo().subscribe((response) => this.checkUserResponse(response),
    //                                     (error) =>  this.alertMessage = error)
    this.vkServ.getUserInfo(this.checkUserResponse);

  }

  ngAfterViewInit() {
    //this.hideArrayAlbumContent();
    this.getAlbums();

  }

  private get fullName() {
    return this.currentUser.first_name + ' ' + this.currentUser.last_name
  }

  getSelectedAlbumContent(album: Album) {
    this.hideArrayAlbumContent();
    this.listPhotoContent.getAllPhotoInAlbum(album.aid)
  }

  onBackwardFromAlbumContent(event) {
    this.showArrayAlbumContent();
  }

  showArrayAlbumContent() {
    this.arrayAlbumContent.nativeElement.hidden = false;
  }

  hideArrayAlbumContent() {
    this.arrayAlbumContent.nativeElement.hidden = true;
  }

  getAlbums(){
    // this.vkServ.vkGetAlbums().subscribe((response) => this.checkAlbumsResponse(response),
    //                                     (error) =>  this.alertMessage = error)
    this.vkServ.vkGetAlbums(this.checkAlbumsResponse)
  }

  checkAlbumsResponse = (resp) => {
    console.log(resp)
    if(!resp.error){
      this.arrayAlbums = <Album[]> resp.response;
      this.arrayAlbums.forEach((item) => { //find thumb image for array Albums
        this.vkServ.vkGetPhotoById(item.thumb_id, (resp) => {
          item.thumbPhoto = <Photo> resp.response[0];
          this.ref.detectChanges()
        })
      })
      this.showArrayAlbumContent();
    }
    else
      this.alertMessage = resp.error.error_msg;
  }

  checkUserResponse = (resp) => {

    if(!resp.error){
      this.currentUser = <User> resp.response[0];
      this.ref.detectChanges()
    }
    else
      this.alertMessage = resp.error.error_msg;
  }
}
