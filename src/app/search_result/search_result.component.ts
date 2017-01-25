import { Component, Input, OnChanges, HostListener, OnInit, ChangeDetectorRef } from '@angular/core';
import { VkService } from '../services/vk_service/vk.service'
import { ScrollListener } from '../shared/scroll.listener'
import { Image } from '../models/image.model'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'

@Component({
    selector: 'search-result',
    templateUrl: 'search_result.component.html',
    styleUrls: ['search_result.component.css'],
    providers: [VkService]
})

export class SearchResultComponent implements OnChanges, OnInit {
    @Input() searchWord: string;
    arrPhoto: Image[];
    offset: number;
    countSearchPhoto: number;
    statusText: string;
    
    constructor(
        private vkServ: VkService,
        private scrollListener: ScrollListener,
        private ref: ChangeDetectorRef //force rerendering list photo
    ) {
        this.arrPhoto = [];
        this.countSearchPhoto = 10;
        this.offset = 0;
    }

    ngOnInit(){
        //subscribe on event when user scrolled to bottom
        this.scrollListener.publishScrollToBottom((bottom: boolean) => {
            if(bottom){
                //add offset
                this.offset += this.countSearchPhoto;
                this.makeSearch()
            }
        });
    }

    ngOnChanges(){
        //reset list and offset when  searchWord is changed
        this.resetSearch()
        this.makeSearch()
    }

    makeSearch(){
        let data = {
            "q": this.searchWord,
            "offset": this.offset,
            "count": this.countSearchPhoto
        }
        this.vkServ.vkSearchPhoto(data, (result) => {
            console.log(result)
            this.arrPhoto = this.arrPhoto.concat(<Image[]>result.response)
            this.ref.detectChanges(); //force rerendering array pphoto
            console.log(this.arrPhoto)
        });
    }

    resetSearch(){
        this.offset = 0;
        this.arrPhoto = [];
    }

    onClickMorePhoto(){
        this.offset += this.countSearchPhoto
        this.makeSearch()
    }
}