import { Component, Input, OnChanges, HostListener, OnInit } from '@angular/core';
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
    countPhoto: number;
    statusText: string;
    
    constructor(
        private vkServ: VkService,
        private scrollListener: ScrollListener) {
        this.arrPhoto = [];
        this.countPhoto = 10;
        this.offset = 0;
    }

    ngOnInit(){
        this.scrollListener.publishScrollToBottom(this.onScrolledToBottom)
    }

    ngOnChanges(){
       
        this.makeSearch()
    }

    makeSearch(){
       // if(this.searchWord.length > 0){
            let data = {
                "q": this.searchWord,
                "offset": this.offset,
                "count": this.countPhoto
            }
             
            this.vkServ.vkSearchPhoto({data}, (result) => {
                this.arrPhoto = <Image[]>result.response;
                console.log('search!!!!!!!!!!!!!!!!')
                console.log(this.arrPhoto)
            })
        // } else 
        //     this.resetSearch();
    }

    resetSearch(){
        this.offset = 0;
    }

    onScrolledToBottom(bottom : boolean){
        // if(bottom){
        //     console.log('bottom')
        //     this.offset += this.countPhoto;
        //     this.makeSearch()
        // }
    }
}