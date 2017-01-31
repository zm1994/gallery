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
  @ViewChild('albumContent')
  private albumContent: AlbumComponent;

  @ViewChild('arrayAlbumContent')
  private arrayAlbumContent: ElementRef;

  private arrayAlbums: Album[];
  private alertMessage: string;

  constructor(private vkServ: VkService){
    this.arrayAlbums = [];
    this.alertMessage = ''
  }

  ngAfterViewInit() {
    this.getAlbums();
  }

  showAlbumContent(album: Album) {
    this.arrayAlbumContent.nativeElement.hidden = true;
    this.albumContent.showPhotoContent(album.id)
  }

  onBackwardFromAlbumContent(event) {
    this.arrayAlbumContent.nativeElement.hidden = false;
  }

  getAlbums(){
    this.vkServ.vkGetAlbums().subscribe((response) => this.checkResponse(response),
                                        (error) =>  this.alertMessage = error)
  }

  checkResponse(resp){
    console.log(resp)
    if(!resp.error){
      this.arrayAlbums = <Album[]> resp.response.items
    }
    else
      this.alertMessage = resp.error.error_msg;
  }
}
