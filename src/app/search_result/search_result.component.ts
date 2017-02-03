import { Component, Input, OnChanges, HostListener, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { VkService } from '../services/vk_service/vk.service'
import { ScrollListener } from '../shared/scroll.listener'
import { ListPhotoComponent } from '../photo/list_photo.component'

import 'rxjs/add/operator/map'

@Component({
    selector: 'search-result',
    templateUrl: 'search_result.component.html',
    styleUrls: ['search_result.component.css'],
    providers: [VkService]
})

export class SearchResultComponent implements OnInit {
    @ViewChild(ListPhotoComponent)
    private listPhotoContent: ListPhotoComponent;

    searchWord: string;
    // alertMessage: string
    // arrPhoto: Photo[];
    offset: number;
    countSearchPhoto: number;

    constructor(
        private scrollListener: ScrollListener,
        private ref: ChangeDetectorRef //force rerendering list photo
    ) {
        this.countSearchPhoto = 10;
        this.offset = 0;
    }

    ngOnInit(){
        //subscribe on event when user scrolled to bottom
        this.scrollListener.publishScrollToBottom((bottom: boolean) => {
            if(bottom){
                //add offset
                this.offset += this.countSearchPhoto;
                this.searchPhotoByName(this.searchWord)
            }
        });
    }

    searchPhotoByName(name){
        this.resetSearchResult();
        this.searchWord = name;
        this.listPhotoContent.getAllPhotoByParams(this.searchWord, this.offset, this.countSearchPhoto)
    }

    resetSearchResult(){
        this.offset = 0;
        // this.arrPhoto = [];
        this.listPhotoContent.clearArrayPhoto()
    }
}
