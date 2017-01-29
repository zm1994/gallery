import {Component, OnInit, ChangeDetectorRef, ViewChild} from '@angular/core';
import { VkService } from '../services/vk_service/vk.service'
import { Album } from '../models/album.model'
import { Photo } from '../models/photo.model'
import { ListPhotoComponent } from '../photo/list_photo.component'

@Component({
  selector: 'list-albums',
  templateUrl: 'list_albums.component.html',
  styleUrls: ['list_albums.component.css'],
  providers: [VkService]
})


export class ListAlbumComponent implements OnInit {
  @ViewChild(ListPhotoComponent)
  private listPhotoContent: ListPhotoComponent;
  
  @ViewChild('arrayAlbumContent') 
  private arrayAlbumContent: HTMLElement;

  arrayAlbums: Album[];
  arrPhotoSelectedAlbum: Photo[]
  selectedAlbumId: string;
  alertMessage: string;

  constructor(private vkServ: VkService,
              private detecorRef: ChangeDetectorRef //force rerendering list photo
  ){
    this.arrayAlbums = [];
    this.alertMessage = ''
    this.selectedAlbumId = ''
    
    
  }

  ngOnInit(){
    this.getAlbums();
  }

  onSelectedAlbum(event){
    console.log(event)
    this.arrayAlbumContent.hidden = true;
    console.log(this.listPhotoContent.getAllPhotoInAlbum(event))
    // this.albumPhotoContent.getAllPhotoInAlbum(event)
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
