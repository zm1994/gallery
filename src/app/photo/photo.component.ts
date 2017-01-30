import { Component, Output, Input, OnChanges, ChangeDetectorRef } from '@angular/core';
import { Photo } from '../models/photo.model'


@Component({
    selector: 'photo',
    templateUrl: 'photo.component.html',
    styleUrls: ['photo.component.css']
})

export class PhotoComponent implements OnChanges {
  @Input() itemPhoto: Photo;

  constructor(private ref: ChangeDetectorRef ){//force rerendering list photo){
        // this.ref.detach(); //force rerendering array pphoto
  }

  ngOnChanges(){
    console.log(this.itemPhoto)
  }
}
