import {Component, OnInit, ChangeDetectorRef, ViewChild, AfterViewInit, ElementRef} from '@angular/core';
import { VkService } from '../services/vk_service/vk.service'
import { Album } from '../models/album.model'
import { Photo } from '../models/photo.model'
import { ListPhotoComponent } from '../photo/list_photo.component'
import { AlbumComponent } from '../album/album.component'

@Component({
  selector: 'list-albums',
  templateUrl: 'list_albums.component.html',
  styleUrls: ['list_albums.component.css'],
  providers: [VkService]
})


export class ListAlbumComponent implements AfterViewInit {
  // @ViewChild('albumContent')
  // private albumContent: AlbumComponent;
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

  ngAfterViewInit() {
    this.hideArrayAlbumContent();
    this.getAlbums();
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
    this.vkServ.vkGetAlbums().subscribe((response) => this.checkResponse(response),
                                        (error) =>  this.alertMessage = error)
  }

  checkResponse(resp){
    console.log(resp)
    if(!resp.error){
      this.arrayAlbums = <Album[]> resp.response.items
      this.showArrayAlbumContent();
    }
    else
      this.alertMessage = resp.error.error_msg;
  }
}
