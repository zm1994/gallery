import { Component, Input, Output, EventEmitter, ViewChild, ElementRef,
         AfterViewInit } from '@angular/core';
import { Album } from '../models/album.model'
import { ListPhotoComponent } from '../photo/list_photo.component'

@Component({
    selector: 'album',
    templateUrl: 'album.component.html',
    styleUrls: ['album.component.css']
})

export class AlbumComponent implements AfterViewInit {
    @Output() backwardFromAlbum: EventEmitter<boolean>;
    @ViewChild('listPhotoContent')
    private listPhotoContent: ListPhotoComponent;
    @ViewChild('albumContent')
    private albumContent: ElementRef;

    constructor(){
        //  this.selectAlbum = new EventEmitter(); 
        this.backwardFromAlbum = new EventEmitter<boolean>();
    }

    ngAfterViewInit() {
        this.albumContent.nativeElement.hidden = true;
    }

    showPhotoContent(albomId: string){
        console.log('tetst')
        this.albumContent.nativeElement.hidden = false;
        this.listPhotoContent.getAllPhotoInAlbum(albomId)
        // this.selectAlbum.emit(albomId);
    }

    goBackFromAlbumContent() {
        this.albumContent.nativeElement.hidden = true;
        this.backwardFromAlbum.emit(true)
    }
}
