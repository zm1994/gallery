import {Component, OnInit, ChangeDetectorRef, ViewChild, AfterViewInit, ElementRef} from '@angular/core';
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


export class ListAlbumComponent implements OnInit, AfterViewInit {
  @ViewChild(ListPhotoComponent)
  private listPhotoContent: ListPhotoComponent;

  @ViewChild('arrayAlbumContent')
  private arrayAlbumContent: ElementRef;

  arrayAlbums: Album[];
  arrPhotoSelectedAlbum: Photo[]
  selectedAlbumId: string;
  alertMessage: string;

  constructor(private vkServ: VkService){
    this.arrayAlbums = [];
    this.alertMessage = ''
    this.selectedAlbumId = ''
  }

  ngAfterViewInit() {
    console.log('ng after view init')
    console.log(this.arrayAlbumContent);       // SomeDir {...}
    console.log(this.listPhotoContent);
    this.getAlbums();
  }

  ngOnInit(){
    //this.getAlbums();
  }

  onSelectedAlbum(event){
    console.log(event)
    console.log(this.arrayAlbumContent)
    this.arrayAlbumContent.nativeElement.hidden = true;
    console.log(this.arrayAlbumContent)
    this.listPhotoContent.getAllPhotoInAlbum(event)
  }

  goBackFromAlbumContent(){
    this.arrayAlbumContent.nativeElement.hidden = false;
    this.listPhotoContent.clearArrayPhoto();
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
