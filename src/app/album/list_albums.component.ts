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

  constructor(private vkServ: VkService){
    this.arrayAlbums = [];
    this.alertMessage = ''
  }

  ngOnInit() {
    this.vkServ.getUserInfo().subscribe((response) => this.checkUserResponse(response),
                                        (error) =>  this.alertMessage = error)
  }

  ngAfterViewInit() {
    //this.hideArrayAlbumContent();
    //this.getAlbums();
  }

  private get fullName() {
    return this.currentUser.first_name + ' ' + this.currentUser.last_name
  }



  getSelectedAlbumContent(album: Album) {
    this.hideArrayAlbumContent();
    this.listPhotoContent.getAllPhotoInAlbum(album.id)
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
    this.vkServ.vkGetAlbums().subscribe((response) => this.checkAlbumsResponse(response),
                                        (error) =>  this.alertMessage = error)
  }

  checkAlbumsResponse(resp) {
    console.log(resp)
    if(!resp.error){
      this.arrayAlbums = <Album[]> resp.response.items
      this.showArrayAlbumContent();
    }
    else
      this.alertMessage = resp.error.error_msg;
  }

  checkUserResponse(resp) {
    console.log(resp)
    if(!resp.error){
      this.currentUser = <User> resp.response[0];
    }
    else
      this.alertMessage = resp.error.error_msg;
  }
}
