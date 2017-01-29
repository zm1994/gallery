import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Album } from '../models/album.model'
import { VkService } from '../services/vk_service/vk.service'

@Component({
    selector: 'album',
    templateUrl: 'album.component.html',
    styleUrls: ['album.component.css']
})

export class AlbumComponent {
    @Input() itemAlbum: Album;
    @Output() selectAlbum: EventEmitter<string>;

    constructor(
        private vkServ: VkService){
         this.selectAlbum = new EventEmitter(); 
    }
    showImages(){
        console.log('tetst')
        this.selectAlbum.emit(this.itemAlbum.id);
    }
}
