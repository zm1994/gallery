import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { VkService } from '../services/vk_service/vk.service'
import { Album } from '../models/album.model'
import { Photo } from '../models/photo.model'

@Component({
  selector: 'list-albums',
  templateUrl: 'list_albums.component.html',
  styleUrls: ['list_albums.component.css'],
  providers: [VkService]
})


export class ListAlbumComponent implements OnInit {
  arrayAlbums: any[];

  constructor(private vkServ: VkService,
              private detecorRef: ChangeDetectorRef //force rerendering list photo
  ){
    this.arrayAlbums = [];
  }

  ngOnInit(){
    this.getAlbums();
  }

  getAlbums(){
    console.log('search alboms')
    // this.vkServ.vkGetAlbums((result) => {
    //   this.arrayAlbums = <Album[]> result.response;
    //   this.getThumbs();
    //   // console.log(this.arrayAlbums)
    //   //
    // })
    this.vkServ.vkGetAlbums().subscribe((response) => this.arrayAlbums = response)
  }

  getThumbs(){
    this.arrayAlbums.forEach((item) => {
      this.vkServ.vkGetPhotoById(item.aid, item.thumb_id, (result) => {

        item.thumbPhoto = <Photo>result.response[0];
        console.log(item.thumbPhoto);
      })
    })
  }

  getAlb(){
    console.log("HI")
    console.log(this.arrayAlbums)
  }
}
