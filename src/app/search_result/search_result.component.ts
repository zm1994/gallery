import { Component, Input, OnChanges } from '@angular/core';
import { VkService } from '../services/vk_service/vk.service'

@Component({
    selector: 'search-result',
    templateUrl: 'search_result.component.html',
    styleUrls: ['search_result.component.css'],
    providers: [VkService]
})

export class SearchResultComponent implements OnChanges {
    @Input() searchParams: string;

    constructor(private vkServ: VkService) {}

    ngOnChanges(){
        console.log(this.searchParams)
        this.vkServ.vkSearchPhoto(this.searchParams);
    }
}